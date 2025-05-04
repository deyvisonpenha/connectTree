import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-fit p-2">
      <section className="bg-[#2E7D32] flex items-center justify-center min-h-dvh gap-28">
        <div className="flex flex-col flex-1 h-fit max-w-lg gap-6">
          <h1 className="font-sans text-gray-50 text-6xl leading-16 font-extrabold antialiased">
            Show it all. <br />
            Share in one link!
          </h1>
          <h3 className="font-sans text-gray-200 text-md antialiased">
            One link. All your content. Join millions already using ConnectTree
            to connect their audience with what they create and sell across
            every social platform.
          </h3>
          <Button className="">Start Now!</Button>
        </div>
        <img className="w-80 h-96 md:h-[600px]" src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66917b1fff58a30cb42e6f0d_bg.webp" />
      </section>
    </div>
  );
}
