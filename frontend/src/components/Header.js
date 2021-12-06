import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { restlogout } from '../actions/restaurantActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const restdispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantLogin = useSelector((state) => state.restaurantLogin)
  const { restaurantInfo } = restaurantLogin

  const cartItems = useSelector((state) => state.cartItems)
  const { cartItems: cartItemsarray } = cartItems

  useEffect(() => {
    //alert('cart item changed')
  }, [cartItemsarray])

  const logoutHandler = () => {
    dispatch(logout())
  }

  const restlogoutHandler = () => {
    restdispatch(restlogout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Uber Eats</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <SearchBox />
          <Nav className='ml-auto'>
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.firstName} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  <LinkContainer to='/UserOrderScreen'>
                    <NavDropdown.Item>Previous orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    {cartItemsarray ? (
                      <i className='fas fa-shopping-cart'>
                        Cart|{cartItemsarray.length}
                      </i>
                    ) : (
                      <i className='fas fa-shopping-cart'>Cart|0</i>
                    )}
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : restaurantInfo ? (
              <>
                <NavDropdown title={restaurantInfo.restname} id='username'>
                  <LinkContainer to='/AdminScreen'>
                    <NavDropdown.Item>Home</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={restlogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  <LinkContainer to='/RestOrderScreen'>
                    <NavDropdown.Item> orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/MenuScreen'>
                    <NavDropdown.Item> Menu</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to='/customerlogin'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i>Customer Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/restaurantlogin'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i>Restaurant Login
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {/*userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/customerlogin'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-user'></i>Customer Login
                </Nav.Link>
              </LinkContainer>
            )*/}

            {/*restaurantInfo ? (
              <NavDropdown title={restaurantInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={restlogoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/restaurantlogin'>
                <Nav.Link>
                  <i className='fas fa-user'></i>Restaurant Login
                </Nav.Link>
              </LinkContainer>
            )*/}
            {/*
               <LinkContainer to='/cart'>
              <Nav.Link>
                {cartItemsarray ? (
                  <i className='fas fa-shopping-cart'>
                    Cart|{cartItemsarray.length}
                  </i>
                ) : (
                  <i className='fas fa-shopping-cart'>Cart|0</i>
                )}
              </Nav.Link>
            </LinkContainer>
              */}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
