'use client'

import { useState, useEffect } from 'react'

interface PostViewCounterProps {
  slug: string
}

export default function PostViewCounter({ slug }: PostViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const fetchViews = async () => {
      const token = process.env.NEXT_PUBLIC_TOKEN_TINYBIRD_READ
      const endpoint = `https://api.tinybird.co/v0/pipes/views_by_page.json`
      const pageId = `/blog/${slug}`
      try {
        const response = await fetch(
          `${endpoint}?token=${token}&page_id=${encodeURIComponent(pageId)}`
        )
        const data = await response.json()
        setViews(data.data[0].hits)
      } catch (error) {
        console.error('Error fetching post views:', error)
      }
    }

    fetchViews()
  }, [slug])

  return (
    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
      {views !== null ? `${views.toLocaleString()} views` : 'Loading views...'}
    </span>
  )
}
