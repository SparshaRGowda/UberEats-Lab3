import React, { useState, useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import MenuCard from '../components/MenuCard'
import { listProductDetails } from '../actions/productActions'
import {
  addtocartaction,
  removeFromcartaction,
} from '../actions/addCartActions'
import axios from 'axios'

const ProductScreen = ({ match, history }) => {
  const [restData, setRestData] = useState([])
  const [currentItemofModal, setCurrentItemOfModal] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [ifDifferent, setifDifferent] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartItems = useSelector((state) => state.cartItems)
  const {
    cartItems: cartItemsArray,
    loading: cartItemsLoading,
    error: cartItemsError,
  } = cartItems

  useEffect(() => {
    if (!userInfo) {
      history.push('/customerlogin')
    }
    dispatch(listProductDetails(match.params.restid))
    getMenuDetails()
  }, [dispatch, match, userInfo])

  const opencartmodal = (item) => {
    setshowModal(true)
    setCurrentItemOfModal(item)
    // console.log(currentItemofModal)
  }

  const getMenuDetails = async () => {
    //console.log(match.params.restid)
    const { data } = await axios.get(
      `/api/admin/getRestaurantMenu/${match.params.restid}`
    )
    setRestData(data.restaurantresults)
    //console.log(data)
  }

  const handleClose = () => {
    setshowModal(false)
  }
  const incrementCounter = () => {
    let value = quantity + 1
    setQuantity(value)
  }
  const decrementCounter = () => {
    if (quantity > 0) {
      let value = quantity - 1
      setQuantity(value)
    }
  }
  const addtocart = (currentItem) => {
    if (userInfo) {
      const itemModified = {
        dishname: currentItem.dishname,
        dishtype: currentItem.dishtype,
        dishprice: currentItem.dishprice,
        dishquant: quantity,
        restid: currentItem.restid,
        dishid: currentItem.dishid,
      }
      // console.log(itemModified)
      dispatch(addtocartaction(itemModified))
      setQuantity(0)
    } else {
      history.push('/customerlogin')
    }
  }

  const clearCart = () => {
    dispatch(removeFromcartaction())
    window.location.reload(false)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.rimage} alt={product.restname} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.restname}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            {restData.length > 0 ? (
              restData.map((item) => (
                <div onClick={() => opencartmodal(item)}>
                  <MenuCard item={item}></MenuCard>
                </div>
              ))
            ) : (
              <p> Login to view the menu </p>
            )}
          </Row>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cart</Modal.Title>
            </Modal.Header>

            {cartItemsError ? (
              <>
                <Modal.Body>
                  <p>
                    Items in cart are found from a different restaurant. do you
                    want to clear the cart before proceeding?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    cancel
                  </Button>
                  <Button variant='primary' onClick={() => clearCart()}>
                    clear cart
                  </Button>
                </Modal.Footer>
              </>
            ) : currentItemofModal ? (
              <>
                <Modal.Body>
                  {currentItemofModal.dishname}
                  <Row className='py-3'>
                    <Col md={2}>
                      <Button variant='dark' onClick={() => decrementCounter()}>
                        -
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Form.Control type='text' value={quantity} />
                    </Col>
                    <Col md={2}>
                      <Button variant='dark' onClick={() => incrementCounter()}>
                        +
                      </Button>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => addtocart(currentItemofModal)}
                  >
                    Add to Cart
                  </Button>
                </Modal.Footer>
              </>
            ) : (
              <p>No Data!</p>
            )}
          </Modal>
        </div>
      )}
    </>
  )
}

export default ProductScreen
