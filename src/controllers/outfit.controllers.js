import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

router.post("/", auth, async (req, res) => {
  const data = req.body

  console.log(req)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  prisma.outfits.create({
    data: {
      ...data,
      user_id: req.user.payload.id,
    //   price: price
    }
  }).then(outfits => {
    console.log(req.body.id)
    console.log(req.user.payload.id)
    console.log(outfits);
    return res.json(outfits);
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
  const allOutfits = await prisma.outfits.findMany()
  res.json(allOutfits)
      })

router.get('/:id', async (req,res) =>{
  const { id } = req.params
  console.log(id)
  const Outfits = await prisma.outfits.findUnique({
            where: {
            id: Number(id)
           }
          })
        res.json(Outfits)
      })

router.delete('/:id', auth, async (req, res) => {
  const id  = req.body.id;
  console.log(typeof id)

  try {
    const outfits = await prisma.outfits.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!outfits) {
      return res.status(404).send({ 'error': 'Outfits not found' });
    }

      if (req.user.payload.id != outfits.user_id) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

    await prisma.outfits.delete({
      where: {
        id: parseInt(req.body.id)
      }
    })
    .then((outfits) => {
      return res.json(outfits)
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 'error': 'Internal Server Error' });
  }
});
          
export default router   