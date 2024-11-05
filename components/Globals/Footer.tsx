'use client'

import { MailPlus, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { FooterFollowUp } from './FooterFollowUp'

export const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    toast.promise(res, {
      loading: 'Subscribing...',
      success: 'Subscribed successfully',
      error: 'Error while signing out',
    });

    try {
      await res;
      setEmail('') // Clear the email input after successful subscription
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('An error occurred')
    }
  }

  return (
    <footer className="text-white">
      <div className="flex flex-col items-center justify-center h-[50vh] backdrop-blur-3xl bg-gradient-to-b from-transparent to-primary-100 p-4">
        <div className="w-full max-w-md md:p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-950">F0 NEWSLETTER</h2>
            <p className="text-sm text-primary-700">
              A weekly newsletter to help you be better at all things tech.
            </p>
            <p className="text-xs text-primary-600">By <span>
              <a href='https://ebrahim-ramadan.vercel.app/' target="_blank" className='text-primary-700 hover:text-primary-800'>
                Ebrahim Ramadan
              </a></span> · Over 88,000 subscribers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex items-center justify-between w-full max-w-md">
      <div className="flex items-center gap-2 py-2 px-4 bg-neutral-800 rounded-full text-neutral-300 flex-grow mr-2">
        {/* <MessageCircle size={20} className="text-neutral-400" /> */}
        <input 
        type="email"
        placeholder="Type your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
          className=" w-full outline-none text-sm placeholder-neutral-400 bg-transparent  text-white placeholder:text-primary-600 px-4 py-1 rounded-full"
        />
      </div>
      <button
      type="submit"
       className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors">
        {/* <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6V12M12 12V18M12 12H18M12 12H6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg> */}
        <MailPlus className="w-5 h-5 text-gray-300" />
      </button>
    </form>
        </div>
      </div>
      <FooterFollowUp />
    </footer>
  )
}