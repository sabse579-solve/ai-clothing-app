const { Worker } = require("bullmq");
new Worker("avatarQueue", async (job) => {
  console.log("Processing avatar job:", job.id);
});
