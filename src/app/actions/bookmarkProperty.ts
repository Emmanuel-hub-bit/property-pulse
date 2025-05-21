'use server';
import dbConnect from "../../../config/database";
import User from "../../../models/User";
import { getSessionUser } from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
    await dbConnect();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User is not logged in");
    }

    const {userId} = sessionUser;
    const user = await User.findById(userId);
    
    const isBookmarked = user.boomarks.includes(propertyId);

    let message;
    if (isBookmarked) {
    // if already boomarked, then remove
    user.boomarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
    } else {
     // if not bookmarked, then add
    user.boomarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
    }

    await user.save();
    revalidatePath('/properties/saved', 'page');
    
    return{
        message,
        isBookmarked,
    };

}



export default bookmarkProperty;