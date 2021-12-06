import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Link from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Table,
} from 'react-bootstrap'
import { addtocartaction } from '../actions/addCartActions'
import axios from 'axios'

const CartScreen = ({ match, location, history }) => {
  const dishid = match.params.dishid
  const dishquant = location.search ? Number(location.search.split('=')[1]) : 1
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cartItems)

  //const { userInfo } = userLogin

  useEffect(() => {
    if (localStorage.getItem('userInfo') === null) {
      history.push('/customerlogin')
    }

    if (cartItems.length > 0) {
      let Total = 0
      for (let i = 0; i < cartItems.length; i++) {
        Total += cartItems[i].dishquant * cartItems[i].dishprice
      }
      setTotal(Total)
    }
  }, [cartItems])

  const Checkout = async () => {
    //alert('dsfsd')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    //console.log(userInfo)

    const order = [...cartItems]
    //console.log(order)

    const checkoutdata = {
      userid: userInfo.userid,
      restid: cartItems[0].restid,
      ordertotal: total,
      orderstatus: 'Order Placed',
      order: order,
    }
    //console.log(checkoutdata)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/orders/addorder/',
      checkoutdata,
      config
    )

    if (data.message === 'success') {
      alert('Order Placed Successfully!')
      localStorage.removeItem('cart')
      window.location.reload(false)
    }
  }

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <>
          <Table menu>
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Dish Type</th>
                <th> Qunatity</th>
                <th> Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((dish) => (
                <tr>
                  <td>{dish.dishname}</td>
                  <td>{dish.dishtype}</td>
                  <td>{dish.dishquant}</td>
                  <td>
                    {dish.dishquant}x{dish.dishprice}={' '}
                    {dish.dishquant * dish.dishprice}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan='3'>Total:</td> <td>{total}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={() => Checkout()} type='primary'>
            {' '}
            CheckOut
          </Button>
        </>
      ) : (
        <h3> Cart is Empty..</h3>
      )}
    </div>
  )
}

export default CartScreen
