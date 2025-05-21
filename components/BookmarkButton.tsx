"use client";
import { useState, useEffect } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkedLoading, setIsBookmarkedLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsBookmarkedLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setIsBookmarkedLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please login to bookmark this property");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };
  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;

// "use client";
// import { useState, useEffect } from "react";
// import bookmarkProperty from "@/app/actions/bookmarkProperty";
// import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
// import { toast } from "react-toastify";
// import { FaBookmark } from "react-icons/fa";
// import { useSession } from "next-auth/react";

// const BookmarkButton = ({ property }) => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isBookmarkedLoading, setIsBookmarkedLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) {
//       setIsBookmarkedLoading(false);
//       return;
//     }

//     const checkStatus = async () => {
//       const res = await checkBookmarkStatus(property._id);
//       if (res?.error) toast.error(res.error);
//       if (res?.isBookmarked !== undefined) {
//         setIsBookmarked(res.isBookmarked);
//       }
//       setIsBookmarkedLoading(false);
//     };

//     checkStatus();
//   }, [property._id, userId]);

//   const handleClick = async () => {
//     if (!userId) {
//       toast.error("Please login to bookmark this property");
//       return;
//     }

//     const res = await bookmarkProperty(property._id);
//     if (res?.error) return toast.error(res.error);
//     setIsBookmarked(res.isBookmarked);
//     toast.success(res.message);
//   };

//   if (isBookmarkedLoading) return null;

//   return isBookmarked ? (
//     <button
//       className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
//       onClick={handleClick}
//     >
//       <FaBookmark className="mr-2" /> Remove Bookmark
//     </button>
//   ) : (
//     <button
//       className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
//       onClick={handleClick}
//     >
//       <FaBookmark className="mr-2" /> Bookmark Property
//     </button>
//   );
// };

// export default BookmarkButton;
