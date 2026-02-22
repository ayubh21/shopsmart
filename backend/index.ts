import express from "express"
import { toNodeHandler } from "better-auth/node";
import searchRoutes from "./routes/search"
import cartRoutes from "./routes/cart"
import { auth } from "./lib/auth";

const port = 5000
const app = express()

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use("/search", searchRoutes)
app.use("/cart", cartRoutes)

app.listen(port, () => {
  console.log(`Shopsmart backend listening on port ${port}`)
})
