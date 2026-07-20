// import { CldUploadWidget } from "next-cloudinary";
// import { Plus, Trash } from "lucide-react";

// import { Button } from "../ui/button";
// import Image from "next/image";

// interface ImageUploadProps {
//   value: string[];
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onChange,
//   onRemove,
//   value,
// }) => {
//   const onUpload = (result: any) => {
//     onChange(result.info.secure_url);
//   };

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {value.map((url) => (
//           <div key={url} className="relative w-[200px] h-[200px]">
//             <div className="absolute top-0 right-0 z-10">
//               <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image
//               src={url}
//               alt="collection"
//               className="object-cover rounded-lg"
//               fill
//             />
//           </div>
//         ))}
//       </div>

//       <CldUploadWidget uploadPreset="store1" onUpload={onUpload}>
//         {({ open }) => {
//           return (
//             <Button type="button" onClick={() => open()} className="bg-grey-1 text-white">
//               <Plus className="h-4 w-4 mr-2" />
//               Upload Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;


import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-full h-64 overflow-hidden rounded-lg"
            style={{ aspectRatio: "4/3" }} // نسبة ثابتة لكل الـ cards
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="store1" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-grey-1 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;