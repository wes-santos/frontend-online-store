export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) { return error; }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}&${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) { return error; }
}

export async function getProductsFromQuery(query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) { return error; }
}

export async function getProductsDetails(productID) {
  try {
    const url = `https://api.mercadolibre.com/items/${productID}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) { return error; }
}

export async function getProductsFromCategory(categoryId) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) { return error; }
}
