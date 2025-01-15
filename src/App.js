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
    this.setState(prevState => {
      const {cartList} = prevState
      const itemExists = cartList.find(item => item.id === product.id)

      // If item exists in cart, increment its quantity
      if (itemExists) {
        const updatedCartList = cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
        return {cartList: updatedCartList}
      }

      // If item doesn't exist, add it to cartList
      return {cartList: [...cartList, product]}
    })

    //   TODO: Update the code here to implement addCartItem
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const itemToUpdate = prevState.cartList.find(item => item.id === id)

      // If item exists and quantity > 1, decrement quantity
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        const updatedItem = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity - 1,
        }

        // Map over cartList to update the specific item
        const updatedCartList = prevState.cartList.map(item =>
          item.id === id ? updatedItem : item,
        )

        return {cartList: updatedCartList}
      }

      // If quantity is 1, remove the item by filtering it out
      const updatedCartList = prevState.cartList.filter(item => item.id !== id)
      return {cartList: updatedCartList}
    })
  }
  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const itemToUpdate = prevState.cartList.find(item => item.id === id)

      // If item exists, increment quantity
      if (itemToUpdate) {
        const updatedItem = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity + 1,
        }

        // Map over cartList to update the specific item
        const updatedCartList = prevState.cartList.map(item =>
          item.id === id ? updatedItem : item,
        )

        return {cartList: updatedCartList}
      }

      return null // Return null if no changes are needed
    })
  }
  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
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
