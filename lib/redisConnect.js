const { createClient } =  require('redis');

async function nodeRedisSet ( username , msg) {
    try {
        const client = createClient({
            url : process.env.REDIS_URI
        });
        await client.connect();
        const val = await client.set(username , msg);
        await client.quit();
        return val;
    } catch (error) {
        return false;
    }
}

async function nodeRedisGet ( username ) {
    try {
        const client = createClient({
            url : process.env.REDIS_URI
        });
        await client.connect();
        const val = await client.get(username);
        await client.quit();
        return val;
    } catch (error) {
        return false;
    }
}

export {
    nodeRedisSet , 
    nodeRedisGet
};