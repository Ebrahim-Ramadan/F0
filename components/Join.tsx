'use client'
import { createUserSession } from '@/app/actions';
import { Github, Router } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import LoadingDots from './Globals/LoadingDots';

export const Join = () => {
  const router = useRouter()
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const res = await fetch("/api/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              pic:null
            }),
          });
    
          if (!res.ok) {
            const errMessage = await res.json();
            toast.error('Shit happens, Check Internet connection and Try again later')
            throw new Error(errMessage.message || "Error adding user");
          }
          toast.success('You have successfully joined the community!')
          router.refresh(); 
          router.push('/');
        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
        }
      };
      
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8 md:p-0 p-4 w-full'>

        <div className='font-semibold text-3xl md:text-4xl'>Join Now</div>
    <div className=' flex flex-col items-center justify-center w-full  gap-2'>
      <div className='flex flex-col items-center justify-center w-full '>
        <a  className='w-full md:w-fit justify-center flex flex-row items-center bg-primary-300 hover:bg-primary-200 transition duration-300 font-semibold rounded-full px-4 py-2  gap-2' href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GH_CLIENT_ID}`}>
          Sign In with Github
          <Github size='18'/>
            </a>
          </div>
        <div className='flex flex-col items-center justify-center w-full '>
            <a  className='w-full md:w-fit justify-center flex text-black flex-row items-center bg-primary-950 hover:bg-primary-900 transition duration-300 font-semibold rounded-full px-4 py-2  gap-2' href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GH_CLIENT_ID}`}>
            Sign In with Google
              <Image
              width={24}
              height={24}
              className='w-4 h-4'
              src="/assets/google.svg"
              alt="google"
            />
          </a>
      </div>
    </div>
        <div className='flex flex-col items-center justify-center w-full md:w-1/2'>
        <form onSubmit={handleSubmit} className=" w-full md:w-1/2">
    <div className="mb-4">
      <label className="block mb-2 font-bold text-primary-900">Username</label>
      <input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
        className="w-full rounded-xl border px-4 py-2 text-sm text-black placeholder:text-primary-500 border-primary-500 border-2 bg-transparent text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-primary-50 disabled:text-primary-500 disabled:border-primary-200 disabled:shadow-none
      invalid:border-primary-600 invalid:text-primary-600
      focus:invalid:border-primary-600 focus:invalid:ring-primary-560"
        placeholder='Type Your Email'
        required
      />
    </div>

    <div className="mb-8">
      <label className="block mb-2 font-bold text-primary-900">Password</label>
      <input
        type="password"
        value={password}
        minLength={8}
        onChange={(e) => setPassword(e.target.value.trim())}
        className="w-full rounded-xl border px-4 py-2 text-sm text-black placeholder:text-primary-500 border-primary-500 border-2 bg-transparent text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-primary-50 disabled:text-primary-500 disabled:border-primary-200 disabled:shadow-none
      invalid:border-primary-600 invalid:text-primary-600
      focus:invalid:border-primary-600 focus:invalid:ring-primary-560"
        placeholder='Type Your Password'
        required
      />
    </div>

    {loading  ? (
      <p className="w-full flex justify-center"><LoadingDots/></p>
    ) : (
      <button
      disabled={loading}
        type="submit"
        className="w-full justify-center "
      >
        <span className='md:text-lg px-4 py-2 font-bold text-black bg-primary-950 rounded-xl hover:bg-primary-800 transition-all duration-300'>Join Now</span>
      </button>
    )}

    {/* {error && <p className="text-red-500 mt-2">{error}</p>}
    {success && <p className="text-green-500 mt-2">{success}</p>} */}
  </form>
        </div>
    </div>
  )
}
