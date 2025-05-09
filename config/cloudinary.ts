// import { config } from './../middleware';
// "use client";
// import { CldImage } from 'next-cloudinary';

// // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
// export default function Page() {
//   return (
//     <CldImage
//       src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
//       width="500" // Transform the image: auto-crop to square aspect_ratio
//       height="500"
//       crop={{
//         type: 'auto',
//         source: true
//       }}
//     />
//   );
// }


// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
