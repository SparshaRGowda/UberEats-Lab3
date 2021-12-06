import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import  {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import  Message  from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { menuaction } from '../actions/menuActions'
import axios from 'axios'

const MenuScreen = ({location, history}) => {
    const [dishname, setdishname] = useState('')
    const [dishtype, setdishtype] = useState('')   
    const [dishprice, setdishprice] = useState('')   
    const [message, setMessage] = useState(null) 
    const [dishimage, setImage] = useState(null)

   
    const dispatch = useDispatch()

    const uploadFile = async(e) => {
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('file', file)
        
    

    try{
        const config = {
            headers: {
                'Content-Type': 'multipart/formdata'
            }
        }
        const { data } = await axios.post('/api/uploads/userimage', formdata, config)
        console.log(data)
        setImage(data)
       
    }catch(error){

    }
}

    const restaurantLogin = useSelector (state => state.restaurantLogin)
    const {loading, error, restaurantInfo} = restaurantLogin

    const menuadditem = useSelector (state => state.menuadditem)
    const {loading: addItemLoading, error: addItemError, success} = menuadditem

    const redirect = location.search ? location.search.split ('=') [1] : '/'

    useEffect(() => {
        
        if (!restaurantInfo) {
            history.push(redirect)
        }
    }, [history, restaurantInfo, redirect, error, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(menuaction(dishname, dishtype, dishprice, dishimage))
        }
    

    return <FormContainer>  
        <h1> Menu </h1>
        {addItemError && <Message variant = 'danger'>{addItemError}</Message>}
        {success && <Message variant = 'success'>Item added Successfully</Message>}
        {addItemLoading && <Loader/>}
        <Form onSubmit = {submitHandler}>

        <Form.Group controlId = 'dishname'>
                <Form.Label>Item Name</Form.Label>
                <Form.Control 
                    type = 'text' 
                    placeholder = 'Enter dishname'
                    //value = {email} 
                    onChange = {(e) => setdishname(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId = 'dishtype'>
                <Form.Label>Veg or Non-Veg</Form.Label>
                <Form.Control 
                    type = 'text' 
                    placeholder = 'Enter Veg or Non-Veg'
                    //value = {email} 
                    onChange = {(e) => setdishtype(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId = 'dishprice'>
                <Form.Label>Item Price</Form.Label>
                <Form.Control 
                    type = 'text' 
                    placeholder = 'Enter dishprice'
                    //value = {email} 
                    onChange = {(e) => setdishprice(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId = 'dishimage'>
                <Form.Label>Image</Form.Label>
                <Form.Control 
                    type = 'file' 
                    placeholder = 'Upload Image'
                    accept = 'image/*'
                   // value = {rdtype} 
                    onChange = {uploadFile}>
                </Form.Control>
            </Form.Group>

            <Button className = 'my-3' type = 'submit' variant = 'primary'>
                Add
            </Button>

        </Form>

        </FormContainer>
    
}

export default MenuScreen
