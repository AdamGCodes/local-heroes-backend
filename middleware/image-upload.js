const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,     
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'local-heroes', // Folder in Cloudinary where files will be stored
    allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed file formats
    public_id: (req, file) => {
      return Date.now() + '-' + file.originalname.replace(/(\.jpg|\.jpeg|\.png|\s)/gi, '_') // Specify format for filename
    }
  }
})

const upload = multer({ storage })

module.exports = upload
