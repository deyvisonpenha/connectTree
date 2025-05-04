import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="flex flex-1 w-full h-dvh">
      <section className="w-2/3">
        {/* logo */}
        <div className="w-full mt-16 ml-12">
          <p>ConnectTree</p>
        </div>
        <form className="w-full flex flex-col px-12 mt-16">
            <h1 className="text-5xl font-extrabold antialiased">Create your account</h1>
            <h4 className="mt-4 text-md text-gray-700">Choose your ConnectTree username. You can always change it later.</h4>
            <Input className="mt-6" prefix="connecttree.io/"/>
        </form>
      </section>
      <section className="bg-amber-700 w-1/3 flex flex-1 justify-center items-center p-6 invisible lg:visible">
        <div className="overflow-hidden relative w-[600] h-[750] ">
          <Image
            src="/onboarding.svg"
            width={900}
            height={1200}
            alt="Picture of the author"
            className="absolute w-full h-full object-cover object-center"
          />
        </div>
      </section>
    </div>
  );
}
