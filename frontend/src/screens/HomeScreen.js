import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Dropdown } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  filterProductsAction,
  filterRestaurantsByLocationAction,
} from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const [filteredRestaurants, setfilteredRestaurants] = useState([])
  const [filterApplied, setFilterApplied] = useState(false)
  const { AllRestaurants } = products

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const applyFilter = (e) => {
    // apply filters
    if (e === 'all') {
      dispatch(listProducts())
    } else {
      dispatch(filterProductsAction(e))
    }
  }

  const applyLocationFilter = (e) => {
    if (e === 'all') {
      dispatch(listProducts())
    } else {
      dispatch(filterRestaurantsByLocationAction(e))
    }
  }

  //const products = []

  return (
    <>
      <h1 className='text-center py-5'>Hungry? You are in the right place.</h1>
      <Row>
        <Col md={4}>
          <Dropdown onSelect={(e) => applyFilter(e)}>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              Type of Restaurant
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey='veg'>Veg</Dropdown.Item>
              <Dropdown.Item eventKey='Non-Veg'>non-veg</Dropdown.Item>
              <Dropdown.Item eventKey='vegan'>Vegan</Dropdown.Item>
              <Dropdown.Item eventKey='all'>All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={4}>
          <Dropdown onSelect={(e) => applyLocationFilter(e)}>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              Location
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey='San Jose'>San Jose</Dropdown.Item>
              <Dropdown.Item eventKey='San Francisco'>
                San Francisco
              </Dropdown.Item>
              <Dropdown.Item eventKey='Santa Clara'>Santa Clara</Dropdown.Item>
              <Dropdown.Item eventKey='all'>All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {loading ? <Loader /> : <h3>{error}</h3>}

      {AllRestaurants ? (
        <Row>
          {AllRestaurants.map((restaurant) => (
            <Col md={4}>
              <Product restaurant={restaurant} />
            </Col>
          ))}
        </Row>
      ) : filteredRestaurants ? (
        <p>Loading..</p>
      ) : (
        <p className='text-center py-5'>Login To Continue</p>
      )}
    </>
  )
}

export default HomeScreen
//
