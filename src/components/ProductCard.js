import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddButton from './AddButton';

class ProductCard extends React.Component {
  render() {
    const { productid,
      productName,
      productImage,
      productPrice,
      addProductToCart,
    } = this.props;
    return (
      <div className="product" data-testid="product">
        <Link
          to={ `/productDetails/${productid}` }
          data-testid="product-detail-link"
        >
          <h2>{ productName }</h2>
        </Link>
        <img src={ productImage } alt="Imagem Indisponível" />
        <h3>
          {`R$ ${productPrice}`}
        </h3>
        <AddButton
          productid={ productid }
          productName={ productName }
          productImage={ productImage }
          productPrice={ productPrice }
          addProductToCart={ addProductToCart }
          testid="product-add-to-cart"
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productid: PropTypes.string.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

export default ProductCard;
