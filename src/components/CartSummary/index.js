import React, {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {
    selectedPayment: '',
    showSuccessMessage: false,
  }

  onSelectCOD = event => {
    this.setState({selectedPayment: event.target.value})
  }

  onConfirmOrder = close => {
    this.setState({showSuccessMessage: true})
    close()

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.setState({showSuccessMessage: false})
    }, 5000)
  }

  render() {
    const {selectedPayment, showSuccessMessage} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartSummary = cartList.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          )
          const cartCount = cartList.length

          console.log('cartList=', cartList)

          return (
            <div className="cartsummary_container">
              <div className="summary_cardcontainer">
                <h1 className="ordertotal">
                  Order Total:{' '}
                  <span className="show_inrupees">Rs {cartSummary}/-</span>
                </h1>
                <p className="item_count">{cartCount} Items in cart</p>

                <div>
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="checkout_btn">
                        Checkout
                      </button>
                    }
                  >
                    {close => (
                      <div className="checkoutSection">
                        <h3>Select a payment method</h3>
                        <div className="paymentSection">
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              disabled
                            />
                            Card
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="netbanking"
                              disabled
                            />
                            Net Banking
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="upi"
                              disabled
                            />
                            UPI
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="wallet"
                              disabled
                            />
                            Wallet
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="cod"
                              onChange={this.onSelectCOD}
                            />
                            Cash on Delivery
                          </label>
                        </div>
                        <div>
                          <h4>Order Summary</h4>
                          <ul className="order_Summary">
                            <li>
                              Items: <span>{cartCount}</span>
                            </li>
                            <li>
                              Total: <span>{cartSummary}</span>
                            </li>
                          </ul>
                        </div>
                        <button
                          type="button"
                          className={
                            selectedPayment !== 'cod'
                              ? 'confirm-buttonDiabled'
                              : 'confirm-button'
                          }
                          onClick={() => this.onConfirmOrder(close)}
                          disabled={selectedPayment !== 'cod'}
                        >
                          Confirm Order
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>

                {showSuccessMessage && (
                  <div className="success-message">
                    Your order has been placed successfully
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
