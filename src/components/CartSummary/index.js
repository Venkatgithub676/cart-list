// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0

      cartList.map(each => {
        totalPrice += each.quantity * each.price

        return each
      })

      return (
        <div className="summary-container">
          <h1 className="summary-heading">
            Order Total:
            <span className="summary-heading-span">{` Rs ${totalPrice}/-`}</span>
          </h1>
          <p className="summary-para">{`${cartList.length}`} items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
