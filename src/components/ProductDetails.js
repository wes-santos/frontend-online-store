import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsDetails } from '../services/api';
import AddButton from './AddButton';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.getProductDetails = this.getProductDetails.bind(this);
    this.state = {
      productDetailInfo: [],
      searchDone: false,
      cartItems: this.getProductsFromLocalStorage(),
      counter: this.defineCounter(),
    };
  }

  componentDidMount() {
    this.getProductDetails();
  }

  async getProductDetails() {
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const ProductInfo = await getProductsDetails(productId);
    this.setState(() => ({
      productDetailInfo: ProductInfo,
      searchDone: true,
    }));
  }

  getProductsFromLocalStorage = () => {
    if (localStorage.getItem('cartItems')) {
      const localStorageItems = localStorage.getItem('cartItems');
      const results = JSON.parse(localStorageItems);
      return results;
    }
    return [];
  }

  countProducts = () => {
    this.setState((prev) => ({
      counter: prev.counter + 1,
    }));
  }

  defineCounter = () => {
    if (localStorage.getItem('cartItems')) {
      const localStorageItems = localStorage.getItem('cartItems');
      const results = JSON.parse(localStorageItems);
      return results.length;
    }
    return 0;
  }

  addProductToCart = (productInfo) => {
    let newCartItems = [];
    const prevState = this.state;
    const cartData = [...prevState.cartItems];
    const alreadyExisted = (
      (cartData).findIndex((product) => ((product.productid === productInfo.productid)
      )));
    if (alreadyExisted < 0) {
      newCartItems = [...prevState.cartItems, productInfo];
    } else {
      cartData[alreadyExisted].qtd += 1;
      newCartItems = [...cartData];
    }
    this.setState(() => ({
      cartItems: newCartItems,
    }), () => {
      const { cartItems } = this.state;
      this.countProducts();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
  }

  render() {
    const { productDetailInfo, searchDone, counter } = this.state;
    const { price, thumbnail, title, attributes, id } = productDetailInfo;
    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
        <span>{counter}</span>
        { searchDone
        && (
          <div>
            <p data-testid="product-detail-name">{title}</p>
            <p>{price}</p>
            <p>Especificações Técnicas</p>
            <img src={ thumbnail } alt="Imagem Indisponível" />
            {attributes.map((item) => (
              <div className="productDetails" key={ item.name }>
                <p>{item.name}</p>
                <p>{item.value_name}</p>
              </div>
            ))}
            <AddButton
              productid={ id }
              productName={ title }
              productImage={ thumbnail }
              productPrice={ price }
              addProductToCart={ this.addProductToCart }
              testid="product-detail-add-to-cart"
            />
          </div>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetails;
