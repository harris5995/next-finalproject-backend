import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

// router.get('/:id', async (req, res) => {
//   try {
//     const outfitId = parseInt(req.params.outfitId);

//     const outfit = await prisma.outfits.findUnique({
//       where: { id: outfitId },
//       select: {
//         tops: {
//           select: {
//             name: true,
//             url: true,
//           },
//         },
//         // bottoms: {
//         //   select: {
//         //     name: true,
//         //     url: true,
//         //   },
//         // },
//         // accs: {
//         //   select: {
//         //     name:true,
//         //     url: true,
//         //   },
//         // },
//         // shoes: {
//         //   select: {
//         //     name: true,
//         //     url: true,
//         //   },
//         // },
//       },
//     });

//     if (!outfit) {
//       return res.status(404).json({ error: 'Outfit not found' });
//     }

//     // Send the response with accs.url and shoes.url
//     res.json({
//       topsName: outfit.tops.name,
//       topsUrl: outfit.tops.url,
//       // bottomsUrl: outfit.bottoms.url,
//       // accsUrl: outfit.accs.url,
//       // shoesUrl: outfit.shoes.url,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

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

router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    console.log(typeof data.date)
   

    const outfits = await prisma.outfits.create({
      data: {
        user_id: data.user_id,
        tops_id:  data.tops.id,
        bottoms_id:data.bottoms.id,
        shoes_id: data.shoes.id,
        accs_id: data.accs.id,
        date: data.date,
      },
    });

    return res.json(outfits);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const formattedError = {};
      formattedError[`${err.meta.target[0]}`] = 'already taken';

      return res.status(500).send({
        error: formattedError
      });
    }

    console.error(err); // Log the error for debugging
    return res.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

router.get('/', async (req,res) =>{
  const allOutfits = await prisma.outfits.findMany()
  res.json(allOutfits)
      })



router.delete('/:id', auth, async (req, res) => {
  const id  = req.params;
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

