import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await getCategories();
    this.setState({ categories: response });
  }

  render() {
    const { categories } = this.state;
    const { onClicked } = this.props;
    return (
      categories.map((category) => {
        const { id: categoryId, name: categoryName } = category;
        return (
          <div key={ categoryId }>
            <label
              htmlFor={ categoryId }
              data-testid="category"
            >
              <input
                type="radio"
                id={ categoryId }
                name="category"
                onClick={ () => onClicked(categoryId) }
              />
              { categoryName }
            </label>
          </div>
        );
      })
    );
  }
}

Categories.propTypes = {
  onClicked: PropTypes.func.isRequired,
};

export default Categories;
