import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import  {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import  Message  from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { menuaction } from '../actions/menuActions'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const AdminScreen = ({location, history}) => {
    const [restmenu, setrestmenu] = useState([])
    const restaurantLogin = useSelector (state => state.restaurantLogin)
    const {loading, error, restaurantInfo} = restaurantLogin

    const redirect = location.search ? location.search.split ('=') [1] : '/'

    useEffect(() => {
        
        if (!restaurantInfo) {
            history.push(redirect)
        }

        else{
            getMenuDetails()
        }
        
    }, [history, restaurantInfo])

    const getMenuDetails = async () => {
        const {data} = await axios.get(`/api/admin/getRestaurantMenu/${restaurantInfo.restid}`)
        setrestmenu(data.restaurantresults)
        console.log(data)
    }

    
    const handledelete = () => {
        alert('delete')
    }

    return (
        <div>
            <Table menu>
                <thead>
                    <tr>
                      
                        <th>Dish ID</th>
                        <th>Dish Name</th>
                        <th>Dish Type</th>
                        <th>Dish Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {restmenu.length>0 ? 
                       restmenu.map(
                           item => <tr>
                          
                           <td>{item.dishid}</td>
                           <td>{item.dishname}</td>
                           <td>{item.dishtype}</td>
                           <td>{item.dishprice}</td>
                           <td><Link to = {`/updateitem/${item.dishid}`}><Button  className = 'btn btn-primary'>Update</Button></Link>
                           <Button onClick = {handledelete} className = 'btn btn-danger mx-2'>Delete</Button>
                           </td>
                       </tr>
                       )
                     : <h1>Restaurant details not found</h1>
                    }
                   
                   
                </tbody>
            </Table>
        </div>
    )
}

export default AdminScreen
