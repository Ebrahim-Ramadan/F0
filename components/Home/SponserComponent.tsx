'use client'

import { useRouter } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react'

export default function SponserComponent() {
  const router = useRouter()
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const anchorRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null)

  const createHeart = useCallback(() => {
    if (hearts.length >= 4) return // Limit to 4 hearts

    const id = Date.now()
    const x = Math.random() * 40 - 20 // Random x position between -20 and 20
    const y = Math.random() * -40 - 20 // Random y position between -20 and -60

    setHearts(prevHearts => [...prevHearts, { id, x, y }])

    // Remove the heart after 1 second
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id))
    }, 1000)
  }, [hearts])

  const triggerHearts = useCallback(() => {
    for (let i = 0; i < 4; i++) {
      setTimeout(createHeart, i * 100)
    }
  }, [createHeart])

  const handleMouseEnter = () => {
    triggerHearts()
    timeoutRef.current = setInterval(triggerHearts, 1000)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  const handleClick = () => {
    // Trigger the hearts effect
    triggerHearts()

    // Set a delay before redirecting
    if (redirectTimeout) {
      clearTimeout(redirectTimeout)
    }

    const timeout = setTimeout(() => {
      router.push('https://github.com/Ebrahim-Ramadan/F0')
    }, 500)

    setRedirectTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
      if (redirectTimeout) {
        clearTimeout(redirectTimeout)
      }
    }
  }, [redirectTimeout])

  return (
    <div className="">
      <button
        ref={anchorRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" px-4 py-2 bg-blue-900/80 backdrop-blur-3xl text-xs md:text-sm text-white font-semibold rounded-3xl hover:bg-blue-900 transition-all duration-300"
      >
        Try F0
      </button>
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="absolute w-4 h-4 animate-float-move"
          style={{
            left: `calc(60px + ${heart.x}px)`, // Adjust hearts to the right edge
            bottom: `calc(40px + ${heart.y}px)`, // Adjust hearts to float above the button
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#E20000"
            stroke="#E20000"
            strokeWidth="2"
          />
        </svg>
      ))}
    </div>
  )
}
