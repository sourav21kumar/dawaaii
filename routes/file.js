const express = require('express')
const route_controller = require('../controller/route_controller')
const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
     
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/sendBill', route_controller.sendBill_post)
router.post('/fileUpload',upload.single('bill'),route_controller.post_uploadFile)
router.get('/upload',route_controller.get_uploadBill)
module.exports = router;