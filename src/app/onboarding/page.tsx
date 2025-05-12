import Image from "next/image";
import Onboarding from "@/components/onboarding";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { sessionClaims } = await auth();

  if(sessionClaims?.metadata?.onboardingComplete) redirect('/dashboard')

  return (
    <div className="flex flex-1 w-full h-dvh">
      <section className="w-2/3 ml-24">
        {/* logo */}
        <div className="w-full mt-16 ml-12">
          <p>ConnectTree</p>
        </div>
        <Onboarding />
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
