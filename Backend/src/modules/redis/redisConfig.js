const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisInstance = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});
redisInstance.on('error', (err) => {
    console.error('Redis Instance connection error:', err);
});
redisInstance.on('connect', () => {
    console.log('Connected to Redis Instance');
});

module.exports = { redisInstance };