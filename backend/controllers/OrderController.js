const connectdb = require('../config/db')

const addorder = async (req, res) => {
  //console.log(req.body)

  let { userid, restid, orderstatus, ordertotal, order } = req.body

  var today = new Date()

  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  let ordersql =
    'INSERT INTO `order` (`userid`, `restid`, `orderdate`, `orderstatus`, `ordertotal`) VALUES (?, ?, ?, ?, ?);'

  try {
    const Queryparams = [userid, restid, date, orderstatus, ordertotal]
    console.log(Queryparams)
    connectdb.query(ordersql, Queryparams, (err, result) => {
      if (err) {
        //console.log('here')

        res.status(500).json({
          message: ' Internal Server Error:' + err,
        })
      } else {
        if (result) {
          connectdb.query(
            'SELECT LAST_INSERT_ID() as last_id',
            (err, result) => {
              if (err) {
                res.status(500).json({
                  message: ' Internal Server Error',
                })
              }
              var last_id = result[0].last_id
              let error = false
              for (let i = 0; i < order.length; i++) {
                //console.log(order[i])
                let orderdetailsql =
                  'INSERT INTO `orderinfo` (`orderid`, `userid`, `restid`, `dishid`, `dishname`, `dishquant`, `dishprice`) VALUES (?, ?, ?, ?, ?, ?, ?);'

                const Queryparams_orderinfo = [
                  last_id,
                  userid,
                  restid,
                  order[i].dishid,
                  order[i].dishname,
                  order[i].dishquant,
                  order[i].dishprice,
                ]
                connectdb.query(
                  orderdetailsql,
                  Queryparams_orderinfo,
                  (err, result) => {
                    if (err) {
                      error = true
                      console.log(err)
                    }
                  }
                )
              }
              if (!error) {
                res.status(200).json({
                  message: 'success',
                })
              } else {
                res.status(500).json({
                  message: ' Internal Server Error',
                })
              }
            }
          )
        }
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

const readOrder_user = async (req, res) => {
  let sql = 'SELECT * FROM `order` WHERE userid =' + req.params.userid
  console.log(sql)
  connectdb.query(sql, (err, result) => {
    if (err) {
      //console.log(err)
      throw new Error(err)
    }
    res.send(result)
  })
}

const readOrder_rest = async (req, res) => {
  let sql = "SELECT * FROM `order` WHERE restid ='" + req.params.restid + "'"
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.send(result)
  })
}

const updateOrder_rest = async (req, res) => {
  let sql =
    "UPDATE `order` SET `orderstatus`= '" +
    req.params.orderstatus +
    "' WHERE (`orderid` = '" +
    req.params.orderid +
    "')"

  console.log(sql)
  connectdb.query(sql, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.status(200).json({ message: 'Success' })
  })
}

//module.exports = { addorder, readOrder_user, readOrder_rest, updateOrder_rest }
