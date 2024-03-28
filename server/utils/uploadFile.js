import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationDirectory = "";

    if (file.mimetype.startsWith("image")) {
      destinationDirectory = "upload/images";
    } else if (
      file.mimetype.startsWith("video") ||
      file.mimetype.startsWith("webm")
    ) {
      destinationDirectory = "upload/videos";
    } else {
      destinationDirectory = "upload/other";
    }

    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFile = multer({ storage: storage });

export default uploadFile;
