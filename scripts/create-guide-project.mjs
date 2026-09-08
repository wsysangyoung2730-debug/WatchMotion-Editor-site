// Generates illustrative motion data, not a recording of a real participant.
// Open the resulting package in the actual Mac app to capture guide images.
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
const root = mkdtempSync(join(tmpdir(), "watchmotion-guide-"));
const folder = join(root, "recordings", "desk-object-transfer");
for (const path of [folder, join(root, "project"), join(root, "folders")])
  mkdirSync(path, { recursive: true });
const date = "2026-09-08T10:30:00Z";
const recordingID = "36A33EB6-3A34-4474-97A3-F0988ACD9192";
const json = (path, data) =>
  writeFileSync(join(root, path), JSON.stringify(data, null, 2));
const label = {
  id: "object-transfer",
  name: "Object Transfer",
  colorHex: "F45552",
};
json("recordings/project_labels.json", {
  labels: [
    { label: "unlabeled", isArchived: false, shortcut: 1 },
    { label, isArchived: false, shortcut: 2 },
    {
      label: { id: "rest", name: "Rest", colorHex: "8B929C" },
      isArchived: false,
      shortcut: 3,
    },
    {
      label: {
        id: "wrist-rotation",
        name: "Wrist Rotation",
        colorHex: "6698E7",
      },
      isArchived: false,
      shortcut: 4,
    },
  ],
});
json("recordings/desk-object-transfer/metadata.json", {
  recordingID,
  duration: 20,
  startedAt: date,
  sampleCount: 1000,
  samplingRate: 50,
  recordingMemo:
    "Move the small box from the left marker to the right marker. Pause between transfers.",
  snapDetectionMode: "none",
});
json("recordings/desk-object-transfer/snap_analysis.json", {
  recordingID,
  eventCount: 0,
  snapEvents: [],
});
json("recordings/desk-object-transfer/label.json", {
  displayName: "Desk Object Transfer",
  isPinned: true,
  label: "unlabeled",
  notes: "",
  participantInfo: {
    nameOrNickname: "",
    gender: "unspecified",
    ageGroup: "unspecified",
    heightCM: "",
    dominantHand: "unspecified",
    skillLevel: "unspecified",
    memo: "Move the small box from the left marker to the right marker. Pause between transfers.",
  },
  snapLabels: {},
  snapEventLabels: {},
  manualSnapEvents: [],
  editedSnapEvents: {},
  deletedSnapEventIDs: [],
  updatedAt: date,
});
let csv =
  "index,timestamp,relativeTime,attitudeRoll,attitudePitch,attitudeYaw,rotationRateX,rotationRateY,rotationRateZ,gravityX,gravityY,gravityZ,userAccX,userAccY,userAccZ\n";
for (let i = 0; i < 1000; i++) {
  const t = i / 50;
  const start = [2, 8, 14].find((s) => t >= s && t <= s + 2.5);
  const u = start === undefined ? 0 : (t - start) / 2.5;
  const envelope = start === undefined ? 0 : Math.sin(Math.PI * u) ** 2;
  const noise = 0.0012 * Math.sin(t * 73) + 0.0008 * Math.cos(t * 113);
  const a = envelope * Math.sin(u * Math.PI * 4);
  const b = envelope * Math.sin(u * Math.PI * 3 + 0.5);
  csv +=
    [
      i,
      1788863400 + t,
      t,
      envelope * 0.35,
      envelope * 0.28,
      envelope * -0.18,
      a * 1.2,
      b * 0.9,
      envelope * Math.cos(u * 8) * 0.65,
      0,
      0,
      1,
      a * 0.42 + noise,
      b * 0.25 + noise,
      envelope * Math.sin(u * 11) * 0.17 + noise,
    ].join(",") + "\n";
}
writeFileSync(join(folder, "recording.csv"), csv);
json("folders/folders.json", []);
json("project/project_info.json", {
  name: "Everyday Hand Motions",
  createdAt: date,
});
json("project_manifest.json", {
  appName: "WatchMotion Editor",
  exportedAt: date,
  folderCount: 0,
  formatVersion: 2,
  notes:
    "Illustrative sample data for the WatchMotion Editor user guide. Not a human-subject recording.",
  packageID: "59A8E08A-0088-4F09-AE95-6421B2D7A1D0",
  recordingCount: 1,
});
const output = join(root, "Everyday Hand Motions.watchmotion");
execFileSync(
  "/usr/bin/zip",
  ["-qr", output, "recordings", "project", "folders", "project_manifest.json"],
  { cwd: root },
);
console.log(output);
