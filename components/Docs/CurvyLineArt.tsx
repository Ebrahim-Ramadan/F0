"use client"

import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface Point {
  x: number
  y: number
}

interface CurvyLine {
  start: Point
  end: Point
  control1: Point
  control2: Point
  color: string
  width: number
}

interface CanvasSize {
  width: number
  height: number
}

export  function CurvyLineArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [refresh, setRefresh] = useState<number>(0)
  const [isRotating, setIsRotating] = useState<boolean>(false)

  const canvasSize: CanvasSize = {
    width: 800,
    height: 600
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawArt(ctx, canvasSize)
  }, [refresh])

  const drawArt = (ctx: CanvasRenderingContext2D, size: CanvasSize): void => {
    
    ctx.clearRect(0, 0, size.width, size.height)

    
    ctx.fillStyle = getRandomColor(0.1) 
    ctx.fillRect(0, 0, size.width, size.height)

    
    const lines: CurvyLine[] = Array.from({ length: 50 }, () => generateRandomCurvyLine(size))
    lines.forEach(line => drawCurvyLine(ctx, line))
  }

  const getRandomColor = (maxOpacity: number = 1): string => {
    const opacity = Math.random() * maxOpacity
    return `hsla(${Math.random() * 360}, ${10 + Math.random() * 50}%, ${10 + Math.random() * 50}%, ${opacity})`
  }

  const getRandomPoint = (max: number): number => {
    return Math.random() * max
  }

  const generateRandomCurvyLine = (size: CanvasSize): CurvyLine => {
    return {
      start: { x: getRandomPoint(size.width), y: getRandomPoint(size.height) },
      end: { x: getRandomPoint(size.width), y: getRandomPoint(size.height) },
      control1: { x: getRandomPoint(size.width), y: getRandomPoint(size.height) },
      control2: { x: getRandomPoint(size.width), y: getRandomPoint(size.height) },
      color: getRandomColor(0.8), 
      width: Math.random() * 3 + 0.5 
    }
  }

  const drawCurvyLine = (ctx: CanvasRenderingContext2D, line: CurvyLine): void => {
    ctx.beginPath()
    ctx.moveTo(line.start.x, line.start.y)
    ctx.bezierCurveTo(
      line.control1.x, line.control1.y,
      line.control2.x, line.control2.y,
      line.end.x, line.end.y
    )
    ctx.strokeStyle = line.color
    ctx.lineWidth = line.width
    ctx.stroke()
  }

  const handleRefresh = (): void => {
    setIsRotating(true)
    setRefresh(prev => prev + 1)
    setTimeout(() => setIsRotating(false), 100) 
  }

  return (
  <div className='w-full h-full max-w-4xl mx-auto p-4 scroll-mt-2 scroll-smooth' onClick={handleRefresh} id="CurvyLineArt">
      <a className="relative max-w-4xl mx-auto p-4 cursor-pointer scroll-smooth" href='#CurvyLineArt'>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-auto border border-primary-100 rounded-lg shadow-lg"
      />
     
     
    </a>
    <div className='tracking-tight flex justify-end  text-xs md:text-sm text-primary-500 max-w-4xl mx-auto px-4'>
click to re-generate
    </div>
  </div>
  )
}

export default CurvyLineArt;