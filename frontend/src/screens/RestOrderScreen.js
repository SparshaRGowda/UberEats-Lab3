import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table, Dropdown } from 'react-bootstrap'

const RestOrderScreen = ({ match, location, history }) => {
  const [restOrders, setrestOrders] = useState(null)
  const [changedstatus, setChangeStatus] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('restaurantInfo') === null) {
      history.push('/restaurantlogin')
    }

    getrestorder()
  }, [])

  const getrestorder = async () => {
    const restInfo = JSON.parse(localStorage.getItem('restaurantInfo'))
    const { data } = await axios.get(
      `/api/orders/getrestorder/${restInfo.restid}`
    )
    //console.log(data)
    setrestOrders(data)
    console.log(restOrders)
  }

  const changeOrderStatus = async (e) => {
    const { data } = await axios.get(
      `/api/orders/updaterestorder/${restOrders[0].orderid}/${e}`
    )
    console.log(data)
    if (data.message === 'Success') {
      alert('status changed successfully!')
      window.location.reload(false)
    }
  }

  return (
    <div>
      {restOrders ? (
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
            {restOrders.length > 0 ? (
              restOrders.map((order) => (
                <tr>
                  <td>{order.orderid}</td>
                  <td>{order.orderdate}</td>
                  <td>{order.orderstatus}</td>
                  <td>{order.ordertotal}</td>
                  <td>
                    <Dropdown onSelect={(e) => changeOrderStatus(e)}>
                      <Dropdown.Toggle variant='success' id='dropdown-basic'>
                        Change Status
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey='delivered'>
                          Delivered
                        </Dropdown.Item>
                        <Dropdown.Item eventKey='Preparing'>
                          Preparing
                        </Dropdown.Item>
                        <Dropdown.Item eventKey='cancelled'>
                          Canceled
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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

export default RestOrderScreen
