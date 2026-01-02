module.exports.estimatePose = async (avatarImage) => {
  try {
    // TODO: Real pose detection
    const detectedPose = null; // placeholder

    return detectedPose;

  } catch (err) {
    console.error("poseEstimator error:", err);
    throw err;
  }
};
