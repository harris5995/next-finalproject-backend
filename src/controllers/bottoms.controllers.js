import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateBottoms } from '../validators/bottoms.js'
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

router.post("/", auth, async (req, res) => {
  const data = req.body
  const validationErrors = validateBottoms(data)
//   const price = parseInt(req.body.price, 10);
  console.log(req)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  prisma.bottoms.create({
    data: {
      ...data,
      user_id: req.user.payload.id,
    //   price: price
    }
  }).then(bottoms => {
    console.log(req.body.id)
    console.log(req.user.payload.id)
    console.log(bottoms);
    return res.json(bottoms);
  }).catch(err => {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const formattedError = {}
      formattedError[`${err.meta.target[0]}`] = 'already taken'

      return res.status(500).send({
        error: formattedError
      })
    }
    throw err
  })
})

router.get('/', async (req,res) =>{
  const allBottoms = await prisma.bottoms.findMany()
  res.json(allBottoms)
      })

router.get('/:id', async (req,res) =>{
  const { id } = req.params
  console.log(id)
  const Bottoms = await prisma.bottoms.findUnique({
            where: {
            id: Number(id)
           }
          })
        res.json(Bottoms)
      })

router.delete('/:id', auth, async (req, res) => {
  const id  = req.body.id;
  console.log(typeof id)

  try {
    const bottoms = await prisma.bottoms.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!bottoms) {
      return res.status(404).send({ 'error': 'Bottoms not found' });
    }

      if (req.user.payload.id != bottoms.user_id) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

    await prisma.bottoms.delete({
      where: {
        id: parseInt(req.body.id)
      }
    })
    .then((bottoms) => {
      return res.json(bottoms)
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 'error': 'Internal Server Error' });
  }
});
          
export default router   

