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
