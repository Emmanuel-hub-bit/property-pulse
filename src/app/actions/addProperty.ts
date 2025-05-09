'use server';
import dbConnect from "../../../config/database";
import Property from "../../../models/Property";
import { getSessionUser } from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "../../../config/cloudinary";

async function addProperty(formData) {
    // const amenities = formData.getAll('amenities');
    await dbConnect();

    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }

    const { userId } = sessionUser;

    // // access all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData
        .getAll('images')
        .filter((image) => image.name !== '');
    
    const propertyData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities: formData.getAll('amenities'),
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
       
    };

    // console.log(propertyData);

    const imageUrls = [];
    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

    //     // convert into base 64
        const imageBase64 = imageData.toString('base64');

    //     // make request to cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`, 
            {
                folder: 'propertypulse',
            }
        );

        imageUrls.push(result.secure_url);
    }
    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');

    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;