import Image from "next/image"

/**
 * OhMyAss
 * @param {{user: UserType}} props
 * @returns {JSX.Element}
 * @description
 * This component is rendered when the user has successfully paid for a subscription.
 * It will check the status of the subscription for the given `transaction_id` and `userId`.
 * If the subscription is confirmed, it will display a success message.
 * If the subscription is not confirmed, it will display an error message.
 */
export const OhMyAss  = () => {
  
    return(
      <div className="flex flex-col items-center pt-6">
          <Image
          width={8000}
          height={8000}
          alt='successful-pay'
          src='/assets/successful-pay.png'
          />
          <h1 className="text-xl md:text-2xl text-primary-950 font-bold text-center mb-2">Successful Payment!</h1>
          <p className="text-primary-600 text-center mb-4 leading-tight text-xs md:text-sm">
            Thank you for your purchase. Your transaction has been completed successfully. Save the Date baby!✌🏻️
          </p>
         
        </div>
    )
    
}