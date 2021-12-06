import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RestaurantLoginScreen from './screens/RestaurantLoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import RestaurantRegisterScreen from './screens/RestaurantRegisterScreen'
import MenuScreen from './screens/MenuScreen'
import AdminScreen from './screens/AdminScreen'
import UpdateItemScreen from './screens/UpdateItemScreen'
import CartScreen from './screens/CartScreen'
import UserOrderScreen from './screens/UserOrderScreen'
import RestOrderScreen from './screens/RestOrderScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/customerlogin' component={LoginScreen} />
          <Route path='/customerregister' component={RegisterScreen} />
          <Route path='/restaurantlogin' component={RestaurantLoginScreen} />
          <Route path='/userorderscreen' component={UserOrderScreen} />
          <Route path='/restorderscreen' component={RestOrderScreen} />

          <Route
            path='/restaurantregister'
            component={RestaurantRegisterScreen}
          />
          <Route path='/MenuScreen' component={MenuScreen} />
          <Route path='/updateitem/:dishid' component={UpdateItemScreen} />
          <Route path='/AdminScreen' component={AdminScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/restaurant/:restid' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
