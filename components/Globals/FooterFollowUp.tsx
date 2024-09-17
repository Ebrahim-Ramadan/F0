import { GithubIcon,  TwitterIcon } from 'lucide-react'
import Link from 'next/link'

export const FooterFollowUp = () => {
  return (
    <div className="bg-gradient-to-b from-primary-100 to-primary-200 w-full">
    
    <div className="px-2  py-4 md:px-8 border-t border-primary-300 flex w-full md:justify-between justify-center flex-col md:flex-row items-center">
      <p className="text-sm text-primary-600">&copy; 2025 F0. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a
        href="docs" className="text-sm text-primary-600 hover:text-blue-500 transition-colors">Docs</a>
        <Link
        prefetch={true}
        href="#" className="text-sm text-primary-600 hover:text-blue-500 transition-colors">Privacy</Link>
        <Link
        href="https://mail.google.com/mail/u/0/?fs=1&amp;to=ramadanebrahim791@gmail.com&amp;tf=cm" target='_blank' className="text-sm text-primary-600 hover:text-blue-500 transition-colors">Contact</Link>
      </div>
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <Link
        href="https://github.com/Ebrahim-Ramadan/f0" target='_blank' className="text-sm bg-primary-300 hover:bg-primary-400 transition-colors rounded-full p-2 ">
          <GithubIcon size={20} fill='#CCCCCC' strokeWidth={0} />
        </Link>
        <Link
        href="https://x.com/scoopsahoykid" target='_blank' className="text-sm bg-primary-300 hover:bg-primary-400 transition-colors rounded-full p-2 ">
          <TwitterIcon size={20} fill='#CCCCCC' strokeWidth={0} />
        </Link>
      </div>
      
    </div>
  </div>
  )
}
