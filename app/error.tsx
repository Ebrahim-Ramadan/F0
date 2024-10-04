'use client'
import LoadingDots from '@/components/Globals/LoadingDots'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'

/**
 * Error boundary that will be rendered if an error occurs in the component
 * tree below.
 *
 * @function
 * @param {object} props The props object
 * @param {function} props.reset The function to reset the state
 * @returns {ReactElement} The rendered component
 */
export const Error = ({reset}: {reset: () => void}) => {
const [isPending, startTransition] = useTransition()
const router = useRouter()
    return (
    <div>
        <h2>Something went wrong</h2>
        <button 
        disabled={isPending}
        onClick={()=>{
            startTransition(()=>{
                router.refresh()
                reset()
            })
        }}>
            {isPending && <LoadingDots/>}
            Try again
        </button>
    </div>
  )
}

export default Error