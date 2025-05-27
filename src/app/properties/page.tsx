// import PropertyCard from "../../../components/PropertyCard";
// import dbConnect from "../../../config/database";
// import Property from "../../../models/Property";
// import Pagination from "../../../components/Pagination";

// // const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 2 } }) => {
// const PropertiesPage = async ({ searchParams }) => {
//   const page = parseInt(searchParams?.page || "1", 10);
//   const pageSize = parseInt(searchParams?.pageSize || "2", 10);

//   await dbConnect();
//   const skip = (page - 1) * pageSize;
//   const total = await Property.countDocuments({});
//   const properties = await Property.find({}).skip(skip).limit(pageSize);
//   return (
//     <>
//       <section className="px-4 py-6">
//         <div className="container-xl lg:container mx-auto px-4 py-6">
//           {properties.length === 0 ? (
//             <p>No Property Found</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {properties.map((property) => (
//                 <PropertyCard key={property._id} property={property} />
//               ))}
//             </div>
//           )}
//           <Pagination
//             page={parseInt(page)}
//             pageSize={parseInt(pageSize)}
//             totalItems={total}
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// export default PropertiesPage;

import PropertyCard from "../../../components/PropertyCard";
import dbConnect from "../../../config/database";
import Property from "../../../models/Property";
import Pagination from "../../../components/Pagination";

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) => {
  // Extract searchParams properties safely
  const page = parseInt(searchParams?.page ?? "1", 10);
  const pageSize = parseInt(searchParams?.pageSize ?? "9", 10);

  await dbConnect();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container mx-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Property Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={total} />
      </div>
    </section>
  );
};

export default PropertiesPage;
