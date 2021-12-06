const crypto = require('crypto')

const connectdb = require('../config/db')
const addRestaurant = async (req, res) => {
  let { name, email, password, rlocation, rtype, rdtype, rimage } = req.body
  console.log(req.body)
  const Hashedpassword = crypto.createHash('md5').update(password).digest('hex')

  let sql =
    'INSERT INTO `restaurant` \
    (`restname`, `remail`, `rpassword`, `rlocation`, `rtype`, `rdtype`, `rimage`) \
     VALUES \
     (\
      ?, \
     ?, \
     ?,\
     ?,\
     ?,\
     ?,\
     ?\
     );'

  try {
    connectdb.query(
      'SELECT * FROM restaurant WHERE remail =?',
      [email],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: ' Internal Server Error' + err,
          })
        }

        if (result.length !== 0) {
          res.status(401).json({
            message: ' Restaurant Already Exists!',
          })
        } else {
          //console.log('here')

          const Queryparams = [
            name,
            email,
            Hashedpassword,
            rlocation,
            rtype,
            rdtype,
            rimage,
          ]
          connectdb.query(sql, Queryparams, (err, result) => {
            if (err) {
              //console.log('here')

              res.status(500).json({
                message: ' Internal Server Error:' + err,
              })
            } else {
              if (result) {
                res.status(201).json({
                  name,
                  email,
                  rlocation,
                  rtype,
                  rdtype,
                  rimage,
                })
              } else {
                res.status(500).json({
                  message: ' Internal Server Error:' + err,
                })
              }
            }
          })
        }
      }
    )
  } catch (error) {
    //console.log(error)
    throw new Error('Internal Server Error')
  }
}
const authRestaurant = async (req, res) => {
  //console.log(req.body)

  const { email, password } = req.body
  const Hashedpassword = crypto.createHash('md5').update(password).digest('hex')
  console.log(Hashedpassword)
  try {
    connectdb.query(
      'SELECT * FROM restaurant WHERE remail =?',
      [email],
      (err, result) => {
        if (err) {
          console.log(err)
          res.status(400).json({
            message: err,
          })
        }
        //console.log(result)
        if (result.length === 1) {
          if (result[0].rpassword === Hashedpassword) {
            console.log(result)
            res.json({
              restid: result[0].restid,
              restname: result[0].restname,
              remail: result[0].remail,
              rlocation: result[0].rlocation,
              rtype: result[0].rtype,
              rdtype: result[0].rdtype,
              rimage: result[0].rimage,
            })
          } else {
            res.status(400).json({
              message: "Email Id or Password doesn't match. Please try again.",
            })
          }
        } else {
          res.status(400).json({
            message: "Email Id or Password doesn't match. Please try again.",
          })
        }
      }
    )
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
}

const addmenuItem = async (req, res) => {
  const { restid, dishname, dishtype, dishprice, dishimage } = req.body

  let sql =
    'INSERT INTO `menu` \
            (`restid`, `dishname`, `dishtype`, `dishprice`, `dishimage`) \
             VALUES \
             (\
             ?,\
             ?,\
             ?,\
             ?,\
             ?\
             );'

  try {
    const Queryparams = [restid, dishname, dishtype, dishprice, dishimage]
    //console.log(sql)

    connectdb.query(sql, Queryparams, (err, result) => {
      if (err) {
        // console.log('here')
        res.status(500).json({
          message: ' Internal Server Error:' + err,
        })
      } else {
        if (result) {
          res.status(201).json({
            restid,
            dishname,
            dishtype,
            dishprice,
            dishimage,
          })
        } else {
          res.status(500).json({
            message: ' Internal Server Error:' + err,
          })
        }
      }
    })
  } catch (error) {
    throw new Error('Internal Server ErrorR')
  }
}

const getAllRestaurants = async (req, res) => {
  let sql = 'SELECT * FROM restaurant'
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.status(200).json({
      AllRestaurants: result,
    })
  })
}

const getFilteredRestaurants = async (req, res) => {
  let sql =
    "SELECT * FROM restaurant WHERE rdtype = '" + req.params.filtertype + "'"
  // console.log(sql)
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.status(200).json({
      AllRestaurants: result,
    })
  })
}

const FilterRestaurantsByLocation = async (req, res) => {
  let sql =
    "SELECT * FROM restaurant WHERE rlocation = '" + req.params.location + "'"
  // console.log(sql)
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.status(200).json({
      AllRestaurants: result,
    })
  })
}

const getRestaurant = async (req, res) => {
  let sql = "SELECT * FROM restaurant WHERE restid ='" + req.params.restid + "'"
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    if (result.length === 1) {
      //console.log(result[0])
      res.json({
        restid: result[0].restid,
        restname: result[0].restname,
        remail: result[0].remail,
        rlocation: result[0].rlocation,
        rtype: result[0].rtype,
        rdtype: result[0].rdtype,
        rimage: result[0].rimage,
      })
    } else {
      res.status(400).json({
        'message:': 'Restaurant Not Found!',
      })
    }
  })
}

const getRestaurantProfileforAdmin = async (req, res) => {
  let sql =
    "SELECT * FROM restaurant WHERE admin_id ='" + req.body.admin_id + "'"
  //console.log(sql)
  db.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    if (result.length === 1) {
      //console.log(result[0])
      res.json({
        rest_id: result[0].rest_id,
        rest_name: result[0].rest_name,
        rest_email: result[0].rest_email,
        rest_phone: result[0].rest_phone,
        rest_street: result[0].rest_street,
        rest_city: result[0].rest_city,
        rest_state: result[0].rest_state,
        rest_country: result[0].rest_country,
        rest_zipcode: result[0].rest_zipcode,
        rest_type: result[0].rest_type,
        rest_open_day_from: result[0].rest_open_day_from,
        rest_open_day_to: result[0].rest_open_day_to,
        rest_open_time_from: result[0].rest_open_time_from,
        rest_open_time_to: result[0].rest_open_time_to,
        rest_main_photo: result[0].rest_main_photo,
        rest_desc: result[0].description,
      })
    } else {
      res.status(401).json({
        'message:': 'Restaurant Not Found!',
      })
    }
  })
}

const getMenuByRestaurant = async (req, res) => {
  let sql = "SELECT * FROM menu WHERE rest_id ='" + req.params.id + "'"
  console.log(sql)
  db.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    if (result.length >= 1) {
      //console.log(result[0])
      res.send(result)
    } else {
      res.status(401).json({
        'message:': 'No Menu Items / Restaurant not Found!',
      })
    }
  })
}

/*const updateMenuItem = async (req, res) => {

    //console.log("sasdad!!!")
    if (req.userAuth) {
        //console.log(req.body)
        db.query("SELECT * FROM menu WHERE item_id =?", [req.body.item_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error "+err
                })
            }
            if(result.length !== 0){

                let sql = "UPDATE `menu` SET \
                `item_name`= ? ,\
                `item_category` = ?  ,\
                `item_type`= ? ,\
                `item_photo_path` = ?  ,\
                `item_desc`= ? ,\
                `item_price`= ? \
                WHERE (`item_id` = ?)"
    
                //console.log(sql)
                let paramsArray = [req.body.item_name,
                req.body.item_category,
                req.body.item_type,
                req.body.item_photo_path,
                req.body.item_desc,
                req.body.item_price,
                req.body.item_id
                ]
                //console.log(paramsArray)
                db.query(sql, paramsArray, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error. Please Try again Later. "+err
                        })
                    }
                    else {
                        //console.log(result)
                        res.json({
                        message:"Update Success"
    
                    })
                    }
    
                })

            }
            else{
                res.status(401).json({
                    message: " Menu Item Not Found!"
                })
            }


        })


    }
    else {
        res.status(401).json({
            message: " Unauthorized Access!"
        })
    }



}


const deleteMenuItem = async (req, res) => {


    if (req.userAuth) {
        //console.log(req.body)
        db.query("SELECT * FROM menu WHERE item_id =?", [req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error "+err
                })
            }

            let sql = "DELETE FROM `menu` \
            WHERE (`item_id` = ?)"
            //console.log(req.params.id)
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error. Please Try again Later. "+err
                    })
                }
                else {
                    res.json({
                    message:"Delete Success"

                })
                }

            })

        })


    }
    else {
        res.status(401).json({
            message: " User Not Found!"
        })
    }



}

const getItemDetails = async (req, res) => {

    let sql = "SELECT * FROM menu WHERE item_id ='" + req.params.id + "'"
   //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            throw new Error(err)
        }
        if (result.length >= 1) {
            //console.log(result[0])
            res.json(
                result[0])
        }
        else {
            res.status(401).json({
                "message:": "Item Not Found"
            })

        }
    })



}

const getAllRestaurants = async (req, res) => {

    let sql = "SELECT * FROM restaurant"
   //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({
                "message:": "Internal Server Error"
            })
        }
    
        else {
            res.json(
                {
                    result
                }
                
                )

        }
    })


}

const getRestaurantsByLocation = async (req, res) => {

    let sql = "SELECT * FROM restaurant where rest_city=?"
   //console.log(sql)
    db.query(sql, [req.params.id],(err, result) => {
        if (err) {
            res.status(500).json({
                "message:": "Internal Server Error"
            })
        }
    
        else {
            res.json(
                {
                    result
                }
                
                )

        }
    })


}
*/
/*module.exports = {
  addRestaurant,
  authRestaurant,
  addmenuItem,
  getAllRestaurants,
  getRestaurant,
  getFilteredRestaurants,
  FilterRestaurantsByLocation,
}*/
