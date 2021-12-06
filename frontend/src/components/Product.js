import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({restaurant}) => {
    return (
        <Card className='my-3 p-3 rounded'>
           <Link to={`/restaurant/${restaurant.restid}`}>
               <Card.Img src={restaurant.rimage} variant='top' />
           </Link>

           <Card.Body>
               <Link to={`/restaurant/${restaurant.restid}`}>
                   <Card.Title as = 'div'>
                       <strong>{restaurant.restname}</strong>
                    </Card.Title>
               </Link>
                      
            </Card.Body>
        </Card>
    )
}

export default Product
