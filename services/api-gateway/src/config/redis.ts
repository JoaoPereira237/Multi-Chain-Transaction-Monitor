import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

export const redis = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries: number) => Math.min(retries * 50, 500),
  },
});

redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Redis connected'));
redis.on('ready', () => console.log('Redis ready'));

redis.connect().catch(err => console.error('Failed to connect to Redis:', err));