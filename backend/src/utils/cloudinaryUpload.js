import cloudinary from '../config/cloudinaryConfig.js'; // make sure this path is correct!

// export const uploadImages = async (imageFiles) => {
//   try {
//     // Add log here to verify cloudinary is properly imported
//     console.log('cloudinary is:', cloudinary);

//     const imageUrls = await Promise.all(
//       imageFiles.map(async (image) => {
//         const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

//         const result = await cloudinary.uploader.upload(base64Image, {
//           folder: 'rental-app/properties',
//           allowed_formats: ['jpg', 'jpeg', 'png', 'svg'],
//         });

//         return result.secure_url;
//       })
//     );

//     return imageUrls;
//   } catch (error) {
//     console.error('Cloudinary Upload Error:', error);
//     throw new Error('Image upload failed');
//   }
// };

export const uploadImages = async (imageFiles) => {
    try {
      // ✅ Ensure we're working with an array
      const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
  
      const imageUrls = await Promise.all(
        files.map(async (image) => {
          const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
  
          const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'rental-app/properties',
            allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
          });
  
          return result.secure_url;
        })
      );
  
      return imageUrls.length === 1 ? imageUrls[0] : imageUrls;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Image upload failed');
    }
  };
  
