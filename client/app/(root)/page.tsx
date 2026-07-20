// import Collections from "@/components/Collections";
// import ProductList from "@/components/ProductList";

// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//       <Image src="/import-export.png" alt="import-export" width={2000} height={1000} className="w-screen" />
//       <Collections />
//       <ProductList />
//     </>
//   );
// }

// export const dynamic = "force-dynamic";

import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-[2000px] h-[850px] items-center">
        <Image
          src="/import-export.png"
          alt="import-export"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";