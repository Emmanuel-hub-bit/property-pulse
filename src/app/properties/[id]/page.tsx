// import PropertyHeaderImage from "../../../../components/PropertyHeaderImage";
// import PropertyDetails from "../../../../components/PropertyDetails";
// import PropertyImages from "../../../../components/PropertyImages";
// import BookmarkButton from "../../../../components/BookmarkButton";
// import ShareButtons from "../../../../components/ShareButtons";
// import PropertyContactForm from "../../../../components/PropertyContactForm";
// import dbConnect from "../../../../config/database";
// import Property from "../../../../models/Property";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";
// import { covertToSerializableObject } from "../../../../utils/convertToObject";

// const PropertyPage = async (props: any) => {
//   await dbConnect();

//   const id = props?.params?.id;

//   if (!id) {
//     return (
//       <h1 className="text-center text-2xl font-bold mt-10">
//         Property ID Not Provided
//       </h1>
//     );
//   }

//   const propertyDoc = await Property.findById(id).lean();
//   const property = covertToSerializableObject(propertyDoc);

//   if (!property) {
//     return (
//       <h1 className="text-center text-2xl font-bold mt-10">
//         Property Not Found
//       </h1>
//     );
//   }

//   return (
//     <>
//       <PropertyHeaderImage image={property.images[0][0]} />
//       <section>
//         <div className="container m-auto py-6 px-6">
//           <Link
//             href="/properties"
//             className="text-blue-500 hover:text-blue-600 flex items-center"
//           >
//             <FaArrowLeft className="mr-2" /> Back to Properties
//           </Link>
//         </div>
//       </section>
//       <section className="bg-blue-50">
//         <div className="container m-auto py-10 px-6">
//           <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-6">
//             <PropertyDetails property={property} />
//             <aside className="space-y-4">
//               <BookmarkButton property={property} />
//               <ShareButtons property={property} />
//               <PropertyContactForm property={property} />
//             </aside>
//           </div>
//         </div>
//       </section>
//       <PropertyImages images={property.images} />
//     </>
//   );
// };

// export default PropertyPage;

// // const PropertyPage = async ({ params }: { params: { id: string } }) => {
// //   await dbConnect();

// //   const propertyDoc = await Property.findById(params.id).lean();
// //   const property = covertToSerializableObject(propertyDoc);

// //   if (!property) {
// //     return (
// //       <h1 className="text-center text-2xl font-bold mt-10">
// //         Property Not Found
// //       </h1>
// //     );
// //   }

// //   return (
// //     <>
// //       <PropertyHeaderImage image={property.images[0][0]} />
// //       <section>
// //         <div className="container m-auto py-6 px-6">
// //           <Link
// //             href="/properties"
// //             className="text-blue-500 hover:text-blue-600 flex items-center"
// //           >
// //             <FaArrowLeft className="mr-2" /> Back to Properties
// //           </Link>
// //         </div>
// //       </section>
// //       <section className="bg-blue-50">
// //         <div className="container m-auto py-10 px-6">
// //           <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-6">
// //             <PropertyDetails property={property} />
// //             <aside className="space-y-4">
// //               <BookmarkButton property={property} />
// //               <ShareButtons property={property} />
// //               <PropertyContactForm property={property} />
// //             </aside>
// //           </div>
// //         </div>
// //       </section>
// //       <PropertyImages images={property.images} />
// //     </>
// //   );
// // };

// // export default PropertyPage;

import PropertyHeaderImage from "../../../../components/PropertyHeaderImage";
import PropertyDetails from "../../../../components/PropertyDetails";
import PropertyImages from "../../../../components/PropertyImages";
import BookmarkButton from "../../../../components/BookmarkButton";
import ShareButtons from "../../../../components/ShareButtons";
import PropertyContactForm from "../../../../components/PropertyContactForm";
import dbConnect from "../../../../config/database";
import Property from "../../../../models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { covertToSerializableObject } from "../../../../utils/convertToObject";
import mongoose from "mongoose";

const PropertyPage = async (props: any) => {
  await dbConnect();

  const id = props?.params?.id;

  // ✅ Check if ID is provided and is a valid ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 text-red-600">
        Invalid or Missing Property ID
      </h1>
    );
  }

  const propertyDoc = await Property.findById(id).lean();
  const property = covertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 text-red-600">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0][0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
