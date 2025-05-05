import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../envs.js';
import streamifier from 'streamifier'

cloudinary.config({ 
  cloud_name: envs.cloudinaryCloudName, 
  api_key: envs.cloudinaryApiKey, 
  api_secret: envs.cloudinaryApiSecret
});

const streamUpload = file => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result)
      } else {
        reject(error)
      }
    })

    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

// funcion para actualizar la imagen con esta configuracion cloudinary sobre escribe la imagen con ese public id 
// y reemplaza la imagen por la nueva esto nos evita crear una funcion de eliminacion lo que seria menos limpio
const updateImage = (file, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,   // ID de la imagen existente
        overwrite: true,       // Fuerza la sobreescritura
        resource_type: 'image' // Asegura que es imagen
      },
      (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )

    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

// opcional 
const deleteImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: 'image' },
      (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
  })
}


export { streamUpload, updateImage, deleteImage }