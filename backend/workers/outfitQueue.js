const { Worker } = require("bullmq");
const { outfitQueue } = require("../queues");

new Worker("outfitQueue", async (job) => {
  console.log("Processing outfit job:", job.id);
  // TODO: Generate outfits
});
