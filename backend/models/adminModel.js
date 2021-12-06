const crypto = require('crypto')
//const generateToken = require
const connectdb = require('./config/db')

const addAdmin = async (req, res) => {
    const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = req.body
    //console.log(req.body)
    let id = crypto.createHash('sha256').update(email + firstName).digest('base64')
    let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`, `street`, `city`, `state`,`country`,`zipcode`, `photo_path`) VALUES ('" + id + "', '" + firstName + "', '" + lastName + "','" + email + "','" + password + "','" + phone + "','" + Street + "','" + City + "','" + State + "','" + Country + "','" + ZipCode +"','"+image+"' ) "

    try {

        db.query("SELECT * FROM users WHERE email =?", [email], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"
                })
            }

            if (result.length !== 0) {
                res.status(401).json({
                    message: " Admin Already Exists!"
                })
            }
            else {
                const queryparams = [
                        id,
                        firstName,
                        lastName,
                        email,
                        password,
                        phone,
                        Street,
                        City,
                        Country,
                        ZipCode,
                        image


                ]
                db.query(sql, queryparams,(err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error:"+err
                        })
                    }
                    else{

                        res.status(201).json({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phone: phone,
                            Street: Street,
                            City: City,
                            State: State,
                            Country: Country
    
                        })

                    }


                })

            }

        })
    } catch (error) {
        throw new Error("Internal Server Error")

    }

}