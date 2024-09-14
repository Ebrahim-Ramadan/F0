import {  GithubIcon,  Star, TwitterIcon } from 'lucide-react'


export const Footer = () => {
  return (
<footer className="bg-gradient-to-b from-black to-primary-100 text-white py-12 px-4 sm:px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center">
F0              
            </h2>
            <p className="text-base md:text-lg text-primary-900">Remove your background within milliseconds.</p>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="fill-current text-yellow-400" size={20} />
              ))}
              <span className="ml-2 text-sm text-primary-600">5.0 from 10,000+ users</span>
            </div>
          </div>
          <div className="space-y-4">
          <div className="flex space-x-2">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-grow bg-transparent border-2 border-primary-600  text-white placeholder:text-primary-600 px-2 rounded-xl"
        />
        <button className="truncate bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-4 py-2 rounded-xl">
          Subscribe
        </button>
      </div>
            <p className="text-sm text-primary-600">Join 100,000+ satisfied customers today!</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-300 flex w-full md:justify-between justify-center flex-col md:flex-row items-center">
          <p className="text-sm text-primary-600">&copy; 2025 F0. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-primary-600 hover:text-blue-500 transition-colors">Privacy</a>
            <a href="https://mail.google.com/mail/u/0/?fs=1&amp;to=ramadanebrahim791@gmail.com&amp;tf=cm" target='_blank' className="text-sm text-primary-600 hover:text-blue-500 transition-colors">Contact</a>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://github.com/Ebrahim-Ramadan/f0" target='_blank' className="text-sm bg-primary-200 hover:bg-primary-300 transition-colors rounded-full p-2 ">
              <GithubIcon size={20} fill='#CCCCCC' strokeWidth={0} />
            </a>
            <a href="https://x.com/scoopsahoykid" target='_blank' className="text-sm bg-primary-200 hover:bg-primary-300 transition-colors rounded-full p-2 ">
              <TwitterIcon size={20} fill='#CCCCCC' strokeWidth={0} />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  )
}
