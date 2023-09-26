import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateAccessories } from '../validators/accessories.js'
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

router.post("/", auth, async (req, res) => {
  const data = req.body
  const validationErrors = validateAccessories(data)
//   const price = parseInt(req.body.price, 10);
  console.log(req)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  prisma.accessories.create({
    data: {
      ...data,
      user_id: req.user.payload.id,
    //   price: price
    }
  }).then(accessories => {
    console.log(req.body.id)
    console.log(req.user.payload.id)
    console.log(accessories);
    return res.json(accessories);
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
  const allaccessories = await prisma.accessories.findMany()
  res.json(allaccessories)
      })

router.get('/:id', async (req,res) =>{
  const { id } = req.params
  console.log(id)
  const accessories = await prisma.accessories.findUnique({
            where: {
            id: Number(id)
           }
          })
        res.json(accessories)
      })

router.delete('/:id', auth, async (req, res) => {
  const id  = req.body.id;
  console.log(typeof id)

  try {
    const accessories = await prisma.accessories.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!accessories) {
      return res.status(404).send({ 'error': 'Accessories not found' });
    }

      if (req.user.payload.id != accessories.user_id) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

    await prisma.accessories.delete({
      where: {
        id: parseInt(req.body.id)
      }
    })
    .then((accessories) => {
      return res.json(accessories)
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 'error': 'Internal Server Error' });
  }
});
          
export default router   