const path = require("path");

/**
 * Ready Player Me helper
 *
 * IMPORTANT:
 * - RPM avatars are created on the FRONTEND (iframe)
 * - Backend only validates & stores avatar URLs
 * - This file also provides a fallback avatar
 */

const FALLBACK_AVATAR_URL = "/avatars/generated/fallback-avatar.glb";

module.exports = {
  /**
   * Used when RPM avatar URL is provided by frontend
   */
  async useRPMAvatar({ avatarUrl }) {
    try {
      if (!avatarUrl || typeof avatarUrl !== "string") {
        throw new Error("Invalid avatar URL");
      }

      // Basic safety check
      if (!avatarUrl.endsWith(".glb")) {
        throw new Error("Avatar URL is not a GLB file");
      }

      console.log("✅ Using Ready Player Me avatar:", avatarUrl);

      return avatarUrl;
    } catch (err) {
      console.error("❌ RPM avatar validation failed:", err.message);
      return FALLBACK_AVATAR_URL;
    }
  },

  /**
   * HARD fallback — used when:
   * - RPM is not integrated
   * - User skipped avatar creation
   * - Any unexpected failure
   */
  async getFallbackAvatar() {
    console.warn("⚠️ Using fallback avatar");
    return FALLBACK_AVATAR_URL;
  }
};
