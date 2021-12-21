import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { userType } from '../../models/interfaces/user.type';
import { verify } from "jsonwebtoken";
import appConfig from "../../config/environments";

const conf = appConfig.passport.JWT

export const getUsers = async (_req: Request, res: Response) => {

  pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id;`
  , (err, response: userType[])=>{
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

  pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id AND s2.user_id = ${id}`
  , (err, response: userType[])=>{
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


export const getMe = async (req: Request, res: Response) => {

  const token: any = req.headers["user_token"];
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET);

  pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id AND s2.user_id = ${jwtPlayload.user_id}`
  , (err, response: userType[])=>{
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
/*
export const getMe = (req: Request, res: Response)=> { 
  const token: any = req.headers["user_token"];
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET);
  //res.send(jwtPlayload)

  //getUser(jwtPlayload.user_id)
}
*/