import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { userType } from '../../models/interfaces/user.type';
import {passwrdHashing, passwrdCheck} from "../../helpers/fucntions"
import { sign } from 'jsonwebtoken';
import appConfig from "../../config/environments";

const conf = appConfig.passport.JWT
/**
 * Login User
 * @route POST /login
*/

export const register = async (req: Request, res: Response) => {
  
  const { email, password, username }: userType = req.body

  email && password && username
    ?
    passwrdHashing(password).then((pswrd)=>{
      pool.query('INSERT INTO users SET?',{
        email,
        password: pswrd,
        username
      }, (err, response: [])=>{
        err
          ?
            res.status(500).json(
              {
                status: 500,
                data: err
              }
            )
          :
            res.status(200).json(
              {
                status: 200,
                response: response
              }
            )
      })
    })
    :
      res.status(500).json(
        {
          status: 500,
          data: "Fields missing"
        }
      )
}

export const login = async (req: Request, res: Response) => {

  const { email, password }: userType = req.body

  email && password
    ?(
      pool.query(`SELECT * from users WHERE email = '${email}'`, (err, response: userType[])=>{
        err
          ?
            res.status(500).json(
              {
                status: 500,
                data: err
              }
            )
          :
            passwrdCheck(res, password, response[0].password).then((validPassword)=>{
              console.log(validPassword)
              
              if (validPassword) {
                
                const token = sign({user_id: response[0].user_id, username: response[0].username}, conf.CLIENT_SECRET, {expiresIn: "1h"})
                console.log(token)

                res.status(200).json({ 
                  status: 200,
                  message: "Valid password",
                  token: token,
                  user: response[0]
                })

              }else{
                res.status(400).json({ error: "Fields invalid" });
              }
            })
      })
    )
    :
      res.status(500).json(
        {
          status: 500,
          data: "Fields missing"
        }
      )


}