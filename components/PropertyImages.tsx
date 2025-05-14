// import Image from "next/image";

// const PropertyImage = ({ images }) => {
//   const flatImages = images.flat();

//   return (
//     <section className="bg-blue-50 p-4">
//       <div className="container mx-auto">
//         {flatImages.length === 1 ? (
//           <Image
//             src={flatImages[0]}
//             alt="Property image"
//             className="object-cover h-[400px] mx-auto rounded-xl"
//             width={1800}
//             height={400}
//             priority={true}
//           />
//         ) : (
//           <div className="grid grid-cols-2 gap-4">
//             {flatImages.map((img, index) => (
//               <div
//                 key={index}
//                 className={`${
//                   flatImages.length === 3 && index === 2
//                     ? "col-span-2"
//                     : "col-span-1"
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`Property image ${index + 1}`}
//                   className="object-cover h-[400px] w-full rounded-xl"
//                   width={1800}
//                   height={400}
//                   priority={true}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PropertyImage;

import Image from "next/image";

interface PropertyImageProps {
  images: string[] | string[][] | undefined;
}

const PropertyImage = ({ images }: PropertyImageProps) => {
  // Safe flattening
  const flatImages = Array.isArray(images) ? images.flat() : [];

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {flatImages.length === 0 ? (
          <div className="h-[400px] bg-gray-100 flex items-center justify-center rounded-xl text-gray-500">
            No images available
          </div>
        ) : flatImages.length === 1 ? (
          <Image
            src={flatImages[0]}
            alt="Property image"
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {flatImages.map((img, index) => (
              <div
                key={index}
                className={`${
                  flatImages.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={img}
                  alt={`Property image ${index + 1}`}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImage;
