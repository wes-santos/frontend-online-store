import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemsAdd extends Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      itemAdd,
      productid,
      handleQuantity } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{productName}</p>
        <img src={ productImage } alt="Imagem Indisponível" />
        <p>{productPrice}</p>
        <p data-testid="shopping-cart-product-quantity">{ itemAdd }</p>
        <button
          data-testid="product-decrease-quantity"
          name={ productid }
          onClick={ handleQuantity }
          value="-"
          type="button"
        >
          -
        </button>
        <button
          data-testid="product-increase-quantity"
          name={ productid }
          onClick={ handleQuantity }
          value="+"
          type="button"
        >
          +
        </button>
        <button
          name={ productid }
          type="button"
          value="remove"
          onClick={ handleQuantity }
        >
          X
        </button>
      </div>
    );
  }
}

ItemsAdd.propTypes = {
  productName: PropTypes.string.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  productid: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productImage: PropTypes.string.isRequired,
  itemAdd: PropTypes.number.isRequired,
};

export default ItemsAdd;
