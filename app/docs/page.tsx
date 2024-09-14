export default async function Home() {
    return (
      <div className="relative flex h-full flex-col px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 ml-[-50%] h-[25rem] w-full max-w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
            
          <div className="absolute inset-0 bg-gradient-to-r from-[#222D9C] to-[#7f1d1d] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#222D9C]/30 dark:to-[#450a0a]/30 dark:opacity-100">
            <svg
              aria-hidden="true"
              className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:stroke-white/5"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="gridPattern"
                  width="72"
                  height="56"
                  patternUnits="userSpaceOnUse"
                  x="-12"
                  y="4"
                >
                  <path d="M.5 56V.5H72" fill="none"></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#gridPattern)"></rect>
              <svg x="-12" y="4" className="overflow-visible">
                <rect strokeWidth="0" width="73" height="57" x="288" y="168"></rect>
                <rect strokeWidth="0" width="73" height="57" x="144" y="56"></rect>
                <rect strokeWidth="0" width="73" height="57" x="504" y="168"></rect>
                <rect strokeWidth="0" width="73" height="57" x="720" y="336"></rect>
              </svg>
            </svg>
          </div>
          <svg
            viewBox="0 0 1113 440"
            aria-hidden="true"
            className="absolute left-1/2 top-0 w-full max-w-[69.5625rem] ml-[-50%] fill-white blur-[26px] dark:hidden"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
          </svg>
        </div>
        <div className="mb-16 flex-auto flex justify-center w-full items-center flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            F0
          </h1>
          <p className="mt-4 text-lg text-white">
            F0 is a platform that allows you to remove your background from images
            within milliseconds.
          </p>
        </div>
      </div>
    );
  }
  