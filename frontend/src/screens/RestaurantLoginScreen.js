import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import  {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import  Message  from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {restlogin} from '../actions/restaurantActions'

const RestaurantLoginScreen = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const restaurantLogin = useSelector (state => state.restaurantLogin)
    const {loading, error, restaurantInfo} = restaurantLogin

    const redirect = location.search ? location.search.split ('=') [1] : '/MenuScreen'

    useEffect(() => {
        
        if (restaurantInfo) {
            history.push(redirect)
        }
    }, [history, restaurantInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(restlogin(email, password))
    }

    return <FormContainer>  
        <h1> Sign In </h1>
        {error && <Message variant = 'danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId = 'email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type = 'email' 
                    placeholder = 'Enter email'
                    value = {email} 
                    onChange = {(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId = 'password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type = 'password' 
                    placeholder = 'Enter password'
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button className = 'my-3' type = 'submit' variant = 'primary'>
                Sign In
            </Button>

        </Form>

        <Row className = 'py-3'>
            <Col>
                New User? <Link to ='/restaurantregister'>
                Add Your Restaurant Here</Link>
            </Col>
        </Row>

    </FormContainer>
    
}

export default RestaurantLoginScreen
