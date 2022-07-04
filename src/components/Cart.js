import React from 'react';
import ItemsAdd from './ItemsAdd';

class Cart extends React.Component {
  constructor() {
    super();
    this.handleQuantity = this.handleQuantity.bind(this);
    this.getStorageData = this.getStorageData.bind(this);
    this.state = {
      cartStorage: [],
    };
  }

  componentDidMount() {
    this.getStorageData();
  }

  handleQuantity({ target }) {
    const localStorageItems = localStorage.getItem('cartItems');
    const results = JSON.parse(localStorageItems);
    const { value, name } = target;
    const indexProduct = (results.findIndex((product) => (product.productid === name)));
    if (value === '+') {
      results[indexProduct].qtd += 1;
    } else if (value === '-') {
      results[indexProduct].qtd -= 1;
    } else {
      results.splice(indexProduct, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(results));
    this.getStorageData();
  }

  getStorageData() {
    const localStorageItems = localStorage.getItem('cartItems');
    const results = JSON.parse(localStorageItems);
    this.setState({ cartStorage: results });
  }

  render() {
    const { cartStorage } = this.state;
    return (
      cartStorage ? (
        <div>
          {cartStorage
            .map(({ productid, productName, productImage, productPrice, qtd }) => (
              <ItemsAdd
                key={ productid }
                productid={ productid }
                productName={ productName }
                productPrice={ productPrice }
                productImage={ productImage }
                itemAdd={ qtd }
                handleQuantity={ this.handleQuantity }
              />
            ))}
        </div>
      ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }
}

export default Cart;
