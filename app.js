import express from "express"
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import topsRouter from "./src/controllers/tops.controllers.js"
import bottomsRouter from "./src/controllers/bottoms.controllers.js"
import shoesRouter from "./src/controllers/shoes.controllers.js"
import accessoriesRouter from "./src/controllers/accessories.controllers.js"
import accsRouter from "./src/controllers/accs.controllers.js"

import auth from "./src/middlewares/auth.js" 
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/tops', topsRouter)
app.use('/bottoms', bottomsRouter)
app.use('/shoes', shoesRouter)
app.use('/accessories', accessoriesRouter)
app.use('/accs', accsRouter)

export default app



