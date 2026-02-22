import { Router } from "express";
import { searchAllStores } from "../lib/search";
import { redisClient } from "../db/cache";

const searchRoutes = Router();

searchRoutes.get("/", async (req, res, next) => {
  const queryStr = req.query.query as string
  const lat = req.query.lat as string
  const lon = req.query.lon as string

  console.log(queryStr)
  console.log(lat)
  console.log(lon)

  // Made up format for redis key
  // Query:Lat:Lon
  // This might be bad if lat/lon changes everytime even when we don't move.
  const key = `${queryStr}:${lat}${lon}`

  try {
    // Check cache if this query has been sent before to not send http request again
    const cachedProducts = await redisClient.get(key)
    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts))
    }

    // Logic to return list of all products related to query
    const products = await searchAllStores(queryStr)

    // Need to add em to our database


    // cache this before we send it back
    await redisClient.set(key, JSON.stringify(products))
    return res.json(products)
  } catch (e) {
    return res.json({
      status: 500,
      message: 'Unable to search all stores.',
    });
  }

})

export default searchRoutes;
