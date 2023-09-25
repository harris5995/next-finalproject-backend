import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateTops } from '../validators/tops.js'
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

router.post("/", auth, async (req, res) => {
  const data = req.body
  const validationErrors = validateTops(data)
//   const price = parseInt(req.body.price, 10);
  console.log(req)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  prisma.tops.create({
    data: {
      ...data,
      user_id: req.user.payload.id,
    //   price: price
    }
  }).then(tops => {
    console.log(req.body.id)
    console.log(req.user.payload.id)
    console.log(tops);
    return res.json(tops);
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
  const allTops = await prisma.tops.findMany()
  res.json(allTops)
      })

router.get('/:id', async (req,res) =>{
  const { id } = req.params
  console.log(id)
  const Tops = await prisma.tops.findUnique({
            where: {
            id: Number(id)
           }
          })
        res.json(Tops)
      })

router.delete('/:id', auth, async (req, res) => {
  const id  = req.body.id;
  console.log(typeof id)

  try {
    const tops = await prisma.tops.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!tops) {
      return res.status(404).send({ 'error': 'Tops not found' });
    }

      if (req.user.payload.id != tops.user_id) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

    await prisma.tops.delete({
      where: {
        id: parseInt(req.body.id)
      }
    })
    .then((tops) => {
      return res.json(tops)
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 'error': 'Internal Server Error' });
  }
});
          
export default router   