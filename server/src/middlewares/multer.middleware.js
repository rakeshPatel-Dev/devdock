import multer from "multer"

const uploadDir = "src/upload"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })
export default upload