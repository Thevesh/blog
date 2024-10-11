'use client'

import { useState, useEffect } from 'react'

export default function ViewCounter() {
  const [totalViews, setTotalViews] = useState<number | null>(null)

  useEffect(() => {
    const fetchTotalViews = async () => {
      const token = process.env.NEXT_PUBLIC_TOKEN_TINYBIRD_READ
      const endpoint = `https://api.tinybird.co/v0/pipes/views_total.json?token=${token}`

      try {
        const response = await fetch(endpoint)
        const data = await response.json()
        setTotalViews(data.data[0].total_hits)
      } catch (error) {
        console.error('Error fetching total views:', error)
      }
    }

    fetchTotalViews()
  }, [])

  return (
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mr-2 h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {totalViews !== null ? `${totalViews.toLocaleString()} views` : 'Loading views...'}
    </div>
  )
}
