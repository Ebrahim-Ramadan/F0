'use client'

import { Check, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FooterFollowUp } from './FooterFollowUp'

export const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  
  useEffect(() => {
    const isSubscribed = localStorage.getItem('subscribed') === 'true'
    setSubscribed(isSubscribed)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (subscribed) return 

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        localStorage.setItem('subscribed', 'true')
        setSubscribed(true)
        toast.success('Subscribed successfully')
      } else {
        toast.error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('An error occurred')
    }
  }

  return (
    <footer className="text-white">
      <div className="flex flex-col items-center justify-center h-[50vh] backdrop-nlur-3xl bg-gradient-to-b from-black to-primary-100 p-4">
        <div className="w-full max-w-md backdrop-blur-3xl  md:p-6 space-y-6">
          <div className="flex justify-center">
            f0
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-950">F0 Newsletter</h2>
            <p className="text-sm text-primary-700">
              A weekly newsletter to help you be better at things tech.
            </p>
            <p className="text-xs text-primary-600">By <span>
              <a href='https://ebrahim-ramadan.vercel.app/' target="_blank" className='text-primary-700 hover:text-primary-800'>
              Ebrahim Ramadan
              </a></span> · Over 88,000 subscribers</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2 w-full">
              <input
                type="email"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" bg-transparent border-2 border-primary-600
                focus:border-primary-900 text-white placeholder:text-primary-600 p-2 rounded-xl"
                required
                disabled={subscribed} 
              />
              <button
                type="submit"
                className="w-full md:truncate bg-primary-950 hover:bg-primary-900 transition duration-300 text-black px-2 md:px-4 py-2 rounded-xl text-sm md:text-base font-medium disabled:bg-primary-400 flex justify-center items-center"
                disabled={subscribed} 
              >
                {subscribed ? <Check /> : <>
                <span className='hidden md:block'>Subscribe</span>
                <span className='md:hidden block text-primary-500'>
                  <Send />

                </span>
                
                </>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterFollowUp />
    </footer>
  )
}
