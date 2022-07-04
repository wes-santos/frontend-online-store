import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Categories from './Categories';
import ProductCard from './ProductCard';
import { getProductsFromQuery, getProductsFromCategory } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.searchProduct = this.searchProduct.bind(this);
    this.state = {
      productUserSearch: '',
      productList: [],
      searchDone: false,
      clickedCategory: [],
      counterProducts: 0,
      cartList: [],
    };
  }

  countProducts = () => {
    this.setState((prev) => ({
      counterProducts: prev.counterProducts + 1,
    }));
  }

  addProductToCart = (productInfo) => {
    let newCartList = [];
    const prevState = this.state;
    const cartData = [...prevState.cartList];
    const alreadyExisted = ((cartData).findIndex((product) => (
      (product.productid === productInfo.productid))));
    if (alreadyExisted < 0) {
      newCartList = [...prevState.cartList, productInfo];
    } else {
      cartData[alreadyExisted].qtd += 1;
      newCartList = [...cartData];
    }
    this.setState(() => ({
      cartList: newCartList,
    }), () => {
      const { cartList } = this.state;
      this.countProducts();
      localStorage.setItem('cartItems', JSON.stringify(cartList));
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleClick = async (categoryId) => {
    const response = await getProductsFromCategory(categoryId);
    this.setState({ clickedCategory: response.results });
  }

  renderSelectedCategoryProducts = (clickedCategory) => (
    clickedCategory.length !== 0
      ? (
        <div className="product-wrapper">
          {clickedCategory.map((specificProduct) => {
            const newStr = specificProduct.thumbnail.replace('-I.jpg', '-W.webp');
            return (<ProductCard
              key={ specificProduct.id }
              productid={ specificProduct.id }
              productName={ specificProduct.title }
              productImage={ newStr }
              productPrice={ specificProduct.price }
              addProductToCart={ this.addProductToCart }
            />);
          })}
        </div>)
      : ''
  );

  async searchProduct(event) {
    event.preventDefault();
    const { productUserSearch } = this.state;
    const productsReturned = await getProductsFromQuery(productUserSearch);
    this.setState(() => ({
      productList: productsReturned.results,
      searchDone: true,
    }));
  }

  render() {
    const { productList,
      searchDone,
      counterProducts,
      clickedCategory } = this.state;
    return (
      <div>
        <div className="header">
          <div className="cart-wrapper">
            {
            /*
            Consulta para implementação do Font Awesome:
            https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render#:~:text=import%20%7B%20library%20%7D%20from%20'%40,recommend%20importing%20this%20in%20App.
            */
            }
            <FontAwesomeIcon icon={ faCartShopping } />
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
            >
              Carrinho de Compras
            </Link>
          </div>
          <span>
            {`Produtos no carrinho: ${counterProducts}`}
          </span>
        </div>
        <div className="main-info-wrapper">
          <form onSubmit={ this.searchProduct }>
            <div className="search-wrapper">
              <input
                data-testid="query-input"
                id="home-initial-message"
                name="productUserSearch"
                placeholder="Buscar"
                type="text"
                onChange={ this.handleChange }
              />
              <button
                data-testid="query-button"
                name="productUserSearch"
                type="submit"
              >
                Pesquisar
              </button>
            </div>
            <h3 className="search-text" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
            {
              searchDone
                ? (
                  <div className="product-wrapper">
                    {productList.map((product) => {
                      // Método replace aprendido em:
                      // https://ricardo-reis.medium.com/string-replace-para-substituir-substrings-no-javascript-6db625e5fbc5#:~:text=Use%20o%20m%C3%A9todo%20replace(),uma%20substring%20por%20uma%20nova.
                      const newStr = product.thumbnail.replace('-I.jpg', '-W.webp');
                      return (<ProductCard
                        key={ product.id }
                        productName={ product.title }
                        productImage={ newStr }
                        productPrice={ product.price }
                        productid={ product.id }
                        addProductToCart={ this.addProductToCart }
                      />);
                    })}
                  </div>)
                : this.renderSelectedCategoryProducts(clickedCategory)
            }
          </form>
          <div className="categories-wrapper">
            <Categories
              onClicked={ this.handleClick }
              clickedCategory={ clickedCategory }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
