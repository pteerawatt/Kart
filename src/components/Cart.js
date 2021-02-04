import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { handleChangeCart, fetchCartItem, removeFromCart } from '../actions/cartActions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false
    }
  }

  componentDidMount() {
    this.props.fetchCartItem()
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.props.name,
      email: this.props.email,
      address: this.props.address,
    };
    alert("order" + order.name + order.email + order.address)
  }

  render() {
    const cartItems = this.props.cartItems
    return (
      <div>
        {cartItems.length === 0 ? <div className="cart cart-header"> Cart is empty </div> :
          <div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>}
        <div>
          <div className="cart">
            <Fade left cascade >
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}
                      {" "}<button className="button" onClick={() => this.props.removeFromCart(item)}> Remove </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: {" "}
                    {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                  </div>
                  <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Process</button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade >
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input name="email" type="email" required onChange={e => this.props.handleChangeCart(e)}></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input name="name" type="text" required onChange={e => this.props.handleChangeCart(e)}></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input name="address" type="text" required onChange={e => this.props.handleChangeCart(e)}></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">Checkout</button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  name: state.cart.name,
  email: state.cart.email,
  address: state.cart.address,
  cartItems: state.cart.cartItems || []
}), { handleChangeCart, fetchCartItem, removeFromCart })(Cart)