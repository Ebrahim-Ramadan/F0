import SponserComponent from "@/components/SponserComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl w-full flex mx-auto flex-col items-center justify-center">

      <section className="w-full bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left">
            {/* Left section: Text */}
            <div className="w-full md:w-1/2 space-y-3 md:space-y-4">
              <div className="inline-block rounded-lg transition-all duration-300 hover:bg-primary-200 bg-primary-100 px-3 py-1 text-sm font-bold flex w-fit gap-1 flex-row">Inspired by 
              <svg fill="currentColor" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-5"><path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path><path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path></svg>
              
              </div>
              <h1 className="text-primary-800 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to <span className="text-primary-950">F0</span>
              </h1>
              <p className="text-primary-800 text-lg md:text-xl">
                Discover amazing features and boost your productivity with our innovative solution.
              </p>
              <button className="px-8 py-3 bg-primary-900 text-lg md:text-xl text-black font-semibold rounded-3xl mt-4 hover:bg-primary-700 transition-all duration-300">
                Sign Up Now
              </button>
            </div>
            {/* Right section: Image */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full max-w-md mx-auto">
                {/* Image container */}
                <Image
                  src="/landing.jpeg"
                  alt="Hero image"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-10 text-lg md:text-xl">
                  {/* <button className="">
Join Now
                  </button> */}
<SponserComponent/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
