const multer = require("multer");
const AppError = require("../utils/appError");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/classroom");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `classroom-${req.params.id || req.body.branch}-${Date.now()}.${ext}`
    );
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("photo")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadClassroomPhoto = upload.single("photo");
