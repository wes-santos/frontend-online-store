import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddButton extends Component {
  render() {
    const { productid,
      productName,
      productImage,
      productPrice,
      addProductToCart,
      testid } = this.props;
    return (
      <div>
        <button
          data-testid={ testid }
          type="button"
          onClick={ () => addProductToCart({ productid,
            productName,
            productImage,
            productPrice,
            qtd: 1 }) }
          productid={ productid }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

AddButton.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  productid: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default AddButton;
