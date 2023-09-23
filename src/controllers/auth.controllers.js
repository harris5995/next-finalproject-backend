import express from 'express'
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import { validateLogin } from '../validators/auth.js'
import { signAccessToken } from '../utils/jwt.js'
import cors from "cors"

const router = express.Router()

//Create POST /signin endpoint that takes a user's email and password as its JSON body.
router.post('/', async (req, res) => {

    const data = req.body
  
    const validationErrors = validateLogin(data)
  
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
      error: validationErrors
    })
  
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
  
    if (!user) return res.status(401).send({
      error: 'Email address or password not valid'
    })
  
    const checkPassword = bcrypt.compareSync(data.password, user.password)
    if (!checkPassword) return res.status(401).send({
      error: 'Email address or password not valid'
    })
  
    const userFiltered = filter(user, 'id', 'name', 'email')
    const accessToken = await signAccessToken(userFiltered)
    const userID = user.id
  
    return res.json({ accessToken, userID})
  });
  
    
    export default router