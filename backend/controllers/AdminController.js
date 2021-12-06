const connectdb = require('../config/db')

const getMenu = async (req, res) => {
  let sql = 'SELECT * FROM menu WHERE restid = ?'

  try {
    connectdb.query(sql, [req.params.restid], (err, result) => {
      if (err) {
        res.status(500).json({
          message: ' Internal Server Error' + err,
        })
      } else {
        res.status(200).json({
          restaurantresults: result,
        })
      }
    })
  } catch (error) {
    //console.log(error)
    throw new Error('Internal Server Error')
  }
}

const getMenuItembyid = async (req, res) => {
  let sql = 'SELECT * FROM menu WHERE dishid = ?'

  try {
    connectdb.query(sql, [req.params.dishid], (err, result) => {
      if (err) {
        res.status(500).json({
          message: ' Internal Server Error' + err,
        })
      } else {
        res.status(200).json({
          dish: result,
        })
      }
    })
  } catch (error) {
    //console.log(error)
    throw new Error('Internal Server Error')
  }
}

const updateMenu = async (req, res) => {
  let { dishid, dishname, dishtype, dishprice } = req.body
  //console.log(req.body)
  let sql =
    'UPDATE menu set dishname = ?, dishtype = ?, dishprice = ? where `dishid` = ?'

  try {
    //console.log(sql)
    connectdb.query(
      sql,
      [dishname, dishtype, dishprice, dishid],
      (err, result) => {
        if (err) {
          //console.log(err)
          res.status(500).json({
            message: ' Internal Server Error' + err,
          })
        } else {
          res.status(200).json({
            message: 'success',
          })
        }
      }
    )
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

//module.exports = { getMenu, getMenuItembyid, updateMenu }
