// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'
const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, addCartItem} = value
      console.log('addCartItem:', cartList)
      const cartSummary = cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
      const cartCount = cartList.length
      console.log('cartSummary:', cartSummary)
      return (
        <div className="cartsummary_container">
          <div className="summary_cardcontainer">
            <h1 className="ordertotal">
              Order Total:{' '}
              <span className="show_inrupees">Rs {cartSummary}/-</span>
            </h1>
            <p className="item_count">{cartCount} Items in cart</p>
            <button className="checkout_btn">Checkout</button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
