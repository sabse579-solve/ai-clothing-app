const { Queue } = require("bullmq");
const config = require("./queueConfig");

module.exports.outfitQueue = new Queue("outfitQueue", { connection: config.redis });
module.exports.avatarQueue = new Queue("avatarQueue", { connection: config.redis });
module.exports.tryonQueue = new Queue("tryonQueue", { connection: config.redis });
module.exports.emailQueue = new Queue("emailQueue", { connection: config.redis });
