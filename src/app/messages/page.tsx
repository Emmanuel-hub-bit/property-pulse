import dbConnect from "../../../config/database";
import Message from "../../../models/Message";
// import Property from "../../../models/Property";
import { covertToSerializableObject } from "../../../utils/convertToObject";
import { getSessionUser } from "../../../utils/getSessionUser";
import { redirect } from "next/navigation";
import MessageCard from "../../../components/MessageCard";

const Messages = async () => {
  dbConnect();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    // Option 1: Redirect to login
    redirect("/login");
  }

  const { userId } = sessionUser;

  const readMessages = await Message.find({ receiver: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ receiver: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...readMessages, ...unreadMessages].map((messageDoc) => {
    const message = covertToSerializableObject(messageDoc);
    message.sender = covertToSerializableObject(messageDoc.property);
    return message;
  });
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
