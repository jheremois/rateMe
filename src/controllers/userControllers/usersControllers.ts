import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { userType } from '../../models/interfaces/user.type';
import { verify } from "jsonwebtoken";
import appConfig from "../../config/environments";

const conf = appConfig.passport.JWT

export const getMe = (req: Request, res: Response)=> { 
  const token: any = req.headers["user_token"];
  let jwtPlayload = verify(token, conf.CLIENT_SECRET);
  res.send(jwtPlayload)
};

export const getUsers = async (_req: Request, res: Response) => {

  pool.query('SELECT * FROM users', (err, response: userType[])=>{
    response.length < 1
    ?
      res.status(500).json(
        {
          status: 500,
          data: "No user where found"
        }
      )
    :
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

}

export const getUser = async (req: Request, res: Response) => {

  const {id} = req.params

  pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, response: userType[])=>{
    response.length < 1
    ?
      res.status(500).json(
        {
          status: 500,
          data: "No user where found"
        }
      )
    :
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

}