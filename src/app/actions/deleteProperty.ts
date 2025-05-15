// 'use server';
// import { getSessionUser } from './../../../utils/getSessionUser';
// import cloudinary from "../../../config/cloudinary";
// import dbConnect from "../../../config/database";
// import Property from "../../../models/Property";
// import { revalidatePath } from "next/cache";

// async function deleteProperty(propertyId) {
//     const getSessionUser = await getSessionUser();


//     if(!sessionUser || !sessionUser.UserId) {
//         throw new Error('User ID is required');
//     }

//     const {userId} = getSessionUser;

//     const property = await Property.findById(propertyId);

//     if(!property) throw new Error('Property not found');

//     // verify property ownership
//     if(property.owner.toString() !== userId) {
//         throw new Error('Unauthorized');
//     }

//     // extract public ID from property image URLSearchParams
//     const publicIds = property.images.map((imageUrl) => { 
//         const parts = imageUrl.split('/');
//         return parts.at(-1).split('.').at(0);
//     });

//     // delete images from cloudinary
//     if (publicIds.length > 0) {
//         for (let publicId of publicIds) {
//             await cloudinary.uploader.destroy('propertypulse/' + publicId);
//         }
//     }

//     await property.deleteOne();

//     revalidatePath('/', 'layout');
// }

// export default deleteProperty;

'use server';

import cloudinary from "../../../config/cloudinary";
import dbConnect from "../../../config/database";
import Property from "../../../models/Property";
import { getSessionUser } from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
  await dbConnect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  // ✅ Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // ✅ Extract public IDs from Cloudinary URLs
    const publicIds = (property.images || [])
    .filter((img): img is string => typeof img === 'string' && img.trim() !== '')
    .map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1)?.split('.').at(0); // Get public_id without file extension
    });

  // ✅ Delete from Cloudinary
  for (const publicId of publicIds) {
    if (publicId) {
      await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
    }
  }

  // ✅ Delete the document
  await property.deleteOne();

  // ✅ Revalidate
  revalidatePath("/", "layout");
}

export default deleteProperty;
