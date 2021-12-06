import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Table } from 'react-bootstrap'

const UserOrderScreen = ({ match, location, history }) => {
  const [userOrders, setuserOrders] = useState(null)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (localStorage.getItem('userInfo') === null) {
      history.push('/customerlogin')
    }
    if (!userInfo) {
      history.push('/customerlogin')
    } else {
      getuserorder()
    }
  }, [userInfo])

  const getuserorder = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { data } = await axios.get(
      `/api/orders/getuserorder/${userInfo.userid}`
    )
    console.log(data)
    setuserOrders(data)
    console.log(userOrders)
  }

  return (
    <div>
      {userOrders ? (
        <Table OrderDetails>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Order Total</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <tr>
                  <td>{order.orderid}</td>
                  <td>{order.orderdate}</td>
                  <td>{order.orderstatus}</td>
                  <td>{order.ordertotal}</td>
                  <td>
                    <Button>View Receipt</Button>
                  </td>
                </tr>
              ))
            ) : (
              <h1>Restaurant details not found</h1>
            )}
          </tbody>
        </Table>
      ) : (
        <p>Order details not found</p>
      )}
      <p></p>
    </div>
  )
}

export default UserOrderScreen
