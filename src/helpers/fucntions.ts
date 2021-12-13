import { hashSync, genSalt, compare } from "bcryptjs"
import { Response } from "express";
export const passwrdHashing = async (pswrd: string)=>{
    const salt = await genSalt(10);
    pswrd = hashSync(pswrd, salt);

    return pswrd
}

export const passwrdCheck = async (res: Response, inputPswrd: string, pswrd: string)=>{
    const validPassword = await compare(inputPswrd, pswrd);
    return validPassword
}