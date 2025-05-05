import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }) // 10MB

const uploadSingle = upload.single('file')
const uploadMultiple = upload.array('files', 10)

export { uploadSingle, uploadMultiple }
