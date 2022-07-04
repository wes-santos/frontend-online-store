import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/productDetails/:productId" component={ProductDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
