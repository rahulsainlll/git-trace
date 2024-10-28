import loader from "/public/loader.gif";
import Image from "next/image";

export default function Pageloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-white dark:bg-black">
      <Image src={loader} alt="Loading..." className="w-20 h-20" />
    </div>
  );
}
