'use server';
import dbConnect from "../../../config/database";
import Message from "../../../models/Message";
import { getSessionUser } from "../../../utils/getSessionUser";


async function addMessage(previousState, formData) {
    await dbConnect();

    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }

    const { userId } = sessionUser;

    const receiver = formData.get ('receiver');

    if (userId === receiver) {
        throw new Error("You cannot send a message to yourself");
    }

    const newMessage = new Message({
        sender: userId,
        receiver: formData.get('receiver'),
        property: formData.get ('property'),
        name: formData.get ('name'),
        email: formData.get ('email'),
        phone: formData.get ('phone'),
        body: formData.get ('body'),
    });

    await newMessage.save();

    return { submitted: true };
}

export default addMessage;