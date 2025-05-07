// import PropertyHeaderImage from "../../../../components/PropertyHeaderImage";
// import dbConnect from "../../../../config/database";
// import Property from "../../../../models/Property";
// import { notFound } from "next/navigation";

// // 👇 Tell Next.js this must be rendered dynamically (fixes the error)
// export const dynamic = "force-dynamic";

// const PropertyPage = async ({ params }: { params: { id: string } }) => {
//   await dbConnect();

//   const property = await Property.findById(params.id).lean();

//   if (!property) {
//     notFound();
//   }

//   return (
//     <>
//       <PropertyHeaderImage image={property.images[0]} />
//       <section>{property.name}</section>
//     </>
//   );
// };

// export default PropertyPage;

import PropertyHeaderImage from "../../../../components/PropertyHeaderImage";
import PropertyDetails from "../../../../components/PropertyDetails";
import dbConnect from "../../../../config/database";
import Property from "../../../../models/Property";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const dynamic = "force-dynamic"; // Ensure it's dynamically rendered

const PropertyPage = async (props: any) => {
  await dbConnect();

  const params = await props.params;

  const property = await Property.findById(params.id).lean();

  if (!property) {
    notFound();
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
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
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* {property info} */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
