import React from 'react';
import data from "./data.json";
import Products from "./components/products";
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    }
    // this.sortProducts = this.sortProducts.bind(this)
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter(item => item._id !== product._id) })
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: cartItems.filter(item => item._id !== product._id) }));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      // if item already exist in cart, increment the item.
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  sortProducts = (event) => {
    let sort = event.target ? event.target.value : event;
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ? (a.price > b.price ? 1 : -1) :
          sort === "highest" ? (a.price < b.price ? 1 : -1) :
            (a._id > b._id ? -1 : 1)
      ))
    }))
  }

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.avalibleSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>
          All rights is reserved.
        </footer>
      </div> 
    );
  }
}

export default App;
