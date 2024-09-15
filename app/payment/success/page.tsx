import { ClientComponentSuccessfulPayment } from "@/components/payment/Pay"
import Image from "next/image"
export default function Home() {
  return (
    <div className="flex items-center justify-center h-[50vh] ">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center pt-6">
          {/* <CheckCircle2 className="w-24 h-24 text-green-500 mb-4" /> */}
          <Image
          width={400}
          height={400}
          alt='successful-pay'
          src='/assets/successful-pay.png'
          />
          <h1 className="text-2xl font-bold text-center mb-2">Payment Successful!</h1>
          <p className="text-primary-600 text-center mb-4">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
        </div>
       <ClientComponentSuccessfulPayment/>
      </div>
    </div>
  )
}