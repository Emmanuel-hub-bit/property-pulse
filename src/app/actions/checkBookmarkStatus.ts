'use server';
import dbConnect from "../../../config/database";
import User from "../../../models/User";
import { getSessionUser } from "../../../utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
    await dbConnect();
    
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User is not logged in");
    }
    
    const {userId} = sessionUser;
    const user = await User.findById(userId);
        
    let isBookmarked = user.bookmarks.includes(propertyId);

    return{ isBookmarked };


}

export default checkBookmarkStatus;