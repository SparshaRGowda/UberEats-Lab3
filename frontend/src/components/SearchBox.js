import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
const SearchBox = () => {
  const searchHandle = () => {
    //
  }
  return (
    <div>
      <Form onSubmit={searchHandle}>
        <Row>
          <Col md={9}>
            <Form.Control
              type='text'
              nme='q'
              placeholder='What are you craving today?'
            ></Form.Control>
          </Col>
          <Col md={3}>
            <Button variant='primary' className='mx-2'>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchBox
