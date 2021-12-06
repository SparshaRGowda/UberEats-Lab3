import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import axios from 'axios'


const RestaurantScreen = ({match}) => {
    const dispatch = useDispatch()   

    const [restitem, setrestitem] = useState()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect (() => {
       dispatch(listProductDetails(match.params.restid))
       getMenuDetails()
    }, [dispatch, match])

    const getMenuDetails = async () => {
        const {data} = await axios.get(`/api/admin/getRestaurantMenu/${match.params.restid}`)
        setrestitem(data.restaurantresults)
        console.log(data)
    }
       
    return (
        <>
            <Link className = 'btn btn-light my-3' to='/'>Go Back</Link>                
                {loading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : (
            <div>
            <Row>
                <Col md = {6}>
                    <Image src = {product.rimage} alt = {product.restname} fluid/>
                </Col>
                <Col md = {3}>
                    <ListGroup variant = 'flush'> 
                        <ListGroup.Item>
                            <h3>{product.restname}</h3>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
            </Row>

            <Row>
                {restitem.length>0 ? <p> Menu </p> : <p> Not Found </p>}
            </Row>

            </div>
            

            )}
            
        </>
    )
}

export default RestaurantScreen
