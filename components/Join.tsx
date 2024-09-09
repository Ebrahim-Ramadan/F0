'use client'
import React from 'react'
import LoadingDots from './LoadingDots';

export const Join = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
    
        try {
          const res = await fetch("/api/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
    
          if (!res.ok) {
            const errMessage = await res.json();
            throw new Error(errMessage.message || "Error adding user");
          }
    
          setSuccess("added successfully! Redirecting...");
          setUsername("");
          setPassword("");
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };
      
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 md:p-20 gap-16'>
        <div className='font-semibold text-3xl md:text-4xl'>Join Now</div>
        <form onSubmit={handleSubmit} className=" w-full md:w-1/2">
    <div className="mb-4">
      <label className="block mb-2 font-bold text-primary-900">Username</label>
      <input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
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
      disabled={error || success}
        type="submit"
        className="w-full justify-center "
      >
        <span className='md:text-lg px-4 py-2 font-bold text-black bg-primary-950 rounded-xl hover:bg-primary-800 transition-all duration-300'>Join Now</span>
      </button>
    )}

    {error && <p className="text-red-500 mt-2">{error}</p>}
    {success && <p className="text-green-500 mt-2">{success}</p>}
  </form>
    </div>
  )
}
