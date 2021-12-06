import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const MenuCard = ({item}) => {
    return (
        <Card className='my-3 p-3 rounded'>
           
               <Card.Img src={item.dishimage} variant='top' />

           <Card.Body>
              
                   <Card.Title as = 'div'>
                       <strong>{item.dishname}</strong>
                    </Card.Title>
               
                      
            </Card.Body>
        </Card>
    )
}

export default MenuCard
