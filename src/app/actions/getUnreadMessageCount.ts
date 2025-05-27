'use server';
import dbConnect from "../../../config/database";
import Message from "../../../models/Message";
import { getSessionUser } from "../../../utils/getSessionUser";


async function getUnreadMessageCount () {
    await dbConnect();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
        receiver: userId,
        read: false,
    });

    return {count};
}

export default getUnreadMessageCount ;