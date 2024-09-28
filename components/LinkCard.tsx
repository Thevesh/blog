'use client'

import { useTheme } from 'next-themes'
import React from 'react'

interface LinkCardProps {
  href: string
  title: string
  description: string
  stats: Array<{ label: string; value: string }>
}

const LinkCard: React.FC<LinkCardProps> = ({ href, title, description, stats }) => {
  const { theme } = useTheme()

  return (
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full max-w-md rounded-lg border p-4 no-underline transition-colors duration-200
        ${
          theme === 'dark'
            ? 'border-gray-700 bg-gray-800 hover:bg-gray-700'
            : 'border-gray-200 bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start justify-between space-x-2">
          <h3
            className={`m-0 flex-grow truncate p-0 text-base font-semibold
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          >
            {title}
          </h3>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          >
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </div>
        <p
          className={`mt-1 overflow-hidden text-ellipsis text-sm
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {description}
        </p>
        <div className="mt-2 flex items-center space-x-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </span>
              {stat.value && (
                <span
                  className={`text-xs font-medium 
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}
                >
                  {stat.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </a>
    </div>
  )
}

export default LinkCard
