import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const itemFound = cartList.find(each => each.id === product.id)
    if (itemFound === undefined) {
      this.setState({
        cartList: [product],
      })
      console.log(cartList)
    } //   TODO: Update the code here to implement addCartItem
    else {
      let {quantity} = product
      quantity += 1
      const itemFound1 = cartList.findIndex(each => each.id === product.id)
      cartList.splice(itemFound1, 1, {...product, quantity})
      console.log(quantity, itemFound1, cartList)
      this.setState({cartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const itemRemoved = cartList.findIndex(each => each.id === id)
    cartList.splice(itemRemoved, 1)
    this.setState({cartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const itemFound = cartList.find(each => each.id === id)
    if (itemFound !== undefined) {
      itemFound.quantity += 1
    }
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const itemFound = cartList.find(each => each.id === id)
    if (itemFound !== undefined) {
      itemFound.quantity -= 1
    }
    if (itemFound.quantity === 0) {
      const itemFound1 = cartList.findIndex(each => each.id === id)
      cartList.splice(itemFound1, 1)
    }
    this.setState({cartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
