import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { restregister } from '../actions/restaurantActions'
import axios from 'axios'

const RestRegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rlocation, setrlocation] = useState('')
  const [rtype, setrtype] = useState('')
  const [rdtype, setrdtype] = useState('')
  const [message, setMessage] = useState(null)
  const [restimage, setImage] = useState(null)

  const dispatch = useDispatch()

  const uploadFile = async (e) => {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('file', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/formdata',
        },
      }
      const { data } = await axios.post(
        '/api/uploads/userimage',
        formdata,
        config
      )
      console.log(data)
      setImage(data)
    } catch (error) {}
  }

  const restaurantRegister = useSelector((state) => state.restaurantRegister)
  const { loading, error, restaurantInfo } = restaurantRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (restaurantInfo) {
      history.push('/restaurantlogin')
    }
  }, [restaurantInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        restregister(name, email, password, rlocation, rtype, rdtype, restimage)
      )
    }
  }

  return (
    <FormContainer>
      <h1> Sign Up </h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            // value = {email}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            //value = {email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            //value = {password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            //  value = {confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rlocation'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Restaurant location'
            // value = {rlocation}
            onChange={(e) => setrlocation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rtype'>
          <Form.Label>Pickup/Delivery</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Pickup or Delivery'
            // value = {rtype}
            onChange={(e) => setrtype(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rdtype'>
          <Form.Label>Veg or Non-Veg</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Veg or Non-Veg'
            // value = {rdtype}
            onChange={(e) => setrdtype(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rimage'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='file'
            placeholder='Upload Image'
            accept='image/*'
            // value = {rdtype}
            onChange={uploadFile}
          ></Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link
            to={redirect ? `/restlogin ? redirect = ${redirect}` : '/restlogin'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RestRegisterScreen
