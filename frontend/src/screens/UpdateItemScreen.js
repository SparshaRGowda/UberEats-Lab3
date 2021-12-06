import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { menuaction } from '../actions/menuActions'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const UpdateItemScreen = ({ location, history, match }) => {
  const [item, setitem] = useState([])
  const [dishname, setdishname] = useState('')
  const [dishtype, setdishtype] = useState('')
  const [dishprice, setdishprice] = useState(0)
  const restaurantLogin = useSelector((state) => state.restaurantLogin)
  const { loading, error, restaurantInfo } = restaurantLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (!restaurantInfo) {
      history.push(redirect)
    } else {
      getItemDetails()
    }
  }, [history, restaurantInfo])

  const getItemDetails = async () => {
    const { data } = await axios.get(
      `/api/admin/getMenuItem/${match.params.dishid}`
    )
    console.log(data.dish)
    setitem(data.dish)
    setdishname(data.dish[0].dishname)
    setdishtype(data.dish[0].dishtype)
    setdishprice(data.dish[0].dishprice)
  }

  const submitHandler = async (e) => {
    //submit handler
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const dishid = match.params.dishid
    const { data } = await axios.post(
      '/api/admin/updateMenuItem',
      { dishname, dishtype, dishprice, dishid },
      config
    )
    console.log(data)
    if ((data.message = 'success')) alert('updatesuccess')
    history.push('/AdminScreen')
  }

  return (
    <div>
      return{' '}
      <FormContainer>
        <h1> Menu </h1>
        {item.length > 0 ? (
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId='dishname'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type='text'
                value={dishname}
                placeholder='Enter dishname'
                //value = {email}
                onChange={(e) => setdishname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dishtype'>
              <Form.Label>Veg or Non-Veg</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Veg or Non-Veg'
                value={dishtype}
                onChange={(e) => setdishtype(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dishprice'>
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type='number'
                min='0'
                step='0.01'
                placeholder='Enter Item Price'
                value={dishprice}
                onChange={(e) => setdishprice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        ) : (
          <p>Item ID not found</p>
        )}
      </FormContainer>
    </div>
  )
}

export default UpdateItemScreen
