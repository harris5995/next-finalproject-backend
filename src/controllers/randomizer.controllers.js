import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/random-outfit', async (req, res) => {
  try {
    const outfit = await generateRandomOutfit();
    res.json(outfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function generateRandomOutfit() {
  const randomTop = await prisma.tops.findFirst({ orderBy: { id: 'asc' }, take: 1 });
  const randomBottom = await prisma.bottoms.findFirst({ orderBy: { id: 'asc' }, take: 1 });
  const randomShoe = await prisma.shoes.findFirst({ orderBy: { id: 'asc' }, take: 1 });

  // You can add more logic for other categories like accessories, etc.

  return {
    top: randomTop.name,
    bottom: randomBottom.name,
    shoe: randomShoe.name,
    // Add more categories if needed
  };
}

export default router;