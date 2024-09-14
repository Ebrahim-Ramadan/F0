'use client'

import { Check } from 'lucide-react'
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
      <div className="flex flex-col items-center justify-center h-[50vh] bg-gradient-to-b from-transparent to-primary-100 p-4">
        <div className="w-full max-w-md backdrop-blur-3xl  md:p-6 space-y-6">
          <div className="flex justify-center">
            f0
            {/* <Monitor className="w-16 h-16 text-primary-400" /> */}
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-950">F0 Newsletter</h2>
            <p className="text-sm text-primary-700">
              A weekly newsletter to help you be better at things tech.
            </p>
            <p className="text-xs text-primary-600">By Ebrahim Ramadan · Over 88,000 subscribers</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-transparent border-2 border-primary-600
                focus:border-primary-900 text-white placeholder:text-primary-600 p-2 rounded-xl"
                required
                disabled={subscribed} 
              />
              <button
                type="submit"
                className="bg-primary-950 hover:bg-primary-900 transition duration-300 text-black px-2 md:px-4 py-2 rounded-xl text-sm md:text-base font-medium disabled:bg-primary-400"
                disabled={subscribed} 
              >
                {subscribed ? <Check /> : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterFollowUp />
    </footer>
  )
}
