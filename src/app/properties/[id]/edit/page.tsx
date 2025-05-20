// import PropertyEditForm from "../../../../../components/PropertyEditForm";
// import dbConnect from "../../../../../config/database";
// import Property from "../../../../../models/Property";
// import { covertToSerializableObject } from "../../../../../utils/convertToObject";

// const PropertyEditPage = async ({ params }) => {
//   await dbConnect();

//   const propertyDoc = await Property.findById(params.id).lean();
//   const property = covertToSerializableObject(propertyDoc);

//   if (!property) {
//     return (
//       <h1 className="text-center text-2xl font-bold mt-10">
//         Property Not Found
//       </h1>
//     );
//   }
//   return (
//     <section className="bg-blue-50">
//       <div className="container m-auto max-w-2xl py-24">
//         <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
//           <PropertyEditForm property={property} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PropertyEditPage;

import PropertyEditForm from "../../../../../components/PropertyEditForm";
import dbConnect from "../../../../../config/database";
import Property from "../../../../../models/Property";
import { covertToSerializableObject } from "../../../../../utils/convertToObject";
import mongoose from "mongoose";

interface Props {
  params: {
    id: string;
  };
}

export default async function PropertyEditPage({ params }: Props) {
  await dbConnect();

  const id = params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Invalid Property ID
      </h1>
    );
  }

  const propertyDoc = await Property.findById(id).lean();

  if (!propertyDoc) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  const property = covertToSerializableObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
}

// Force dynamic rendering so params are always available
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}
