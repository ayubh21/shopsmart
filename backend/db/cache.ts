import "dotenv/config"
import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_DATABASE_URL as string
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();