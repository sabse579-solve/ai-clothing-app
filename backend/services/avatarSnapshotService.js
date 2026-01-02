import fs from "fs";
import path from "path";

export function getSnapshotPath(userId, gender, bodyFit) {
  return path.join(
    process.cwd(),
    "backend/public/avatars/cached",
    userId,
    `${gender}_${bodyFit}.glb`
  );
}

export function snapshotExists(userId, gender, bodyFit) {
  return fs.existsSync(getSnapshotPath(userId, gender, bodyFit));
}
