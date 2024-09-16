import Image from "next/image"
import Link from "next/link"
export default function Home() {
  return (
    <div className="flex items-center justify-center h-[50vh] ">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center pt-6">
          <Image
          width={800}
          height={800}
          alt='successful-pay'
          src='/assets/successful-pay.png'
          />
          <h1 className="text-xl md:text-2xl text-primary-950 font-bold text-center mb-2">Payment Successful!</h1>
          <p className="text-primary-600 text-center mb-4 leading-tight text-xs md:text-sm">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
        </div>
        <div className='flex justify-center items-center'>
        <Link href='/images' className="bg-primary-950 text-black px-4 py-2 rounded-3xl text-sm md:text-base  font-bold" >
          UPLOAD IMAGES
        </Link>
      </div>
      </div>
    </div>
  )
}