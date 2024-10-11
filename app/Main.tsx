'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import ViewCounter from '@/components/ViewCounter'
import tagData from 'app/tag-data.json'
import { slug } from 'github-slugger'

const POSTS_PER_PAGE = 12

export default function Home({ posts }) {
  const [selectedTag, setSelectedTag] = useState('All Posts')
  const [currentPage, setCurrentPage] = useState(1)

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = [
    'All Posts',
    ...tagKeys.sort((a, b) => {
      // First, sort by post count (descending)
      const countDiff = tagCounts[b] - tagCounts[a]
      if (countDiff !== 0) return countDiff

      // If post counts are equal, sort alphabetically
      return a.localeCompare(b)
    }),
  ]

  const filteredPosts =
    selectedTag === 'All Posts' ? posts : posts.filter((post) => post.tags.includes(selectedTag))

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const displayPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            I write here
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <ViewCounter />
        </div>
        <div className="flex flex-wrap justify-center space-x-2 py-6">
          {sortedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag)
                setCurrentPage(1)
              }}
              className={`m-1 rounded-lg px-3 py-1 text-sm font-medium 
                ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {tag} {tag !== 'All Posts' && `(${tagCounts[tag]})`}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {!displayPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <article
                key={slug}
                className="flex h-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800"
              >
                <Link href={`/blog/${slug}`} className="block h-[200px] w-full overflow-hidden">
                  <Image
                    src={images?.[0] || '/static/images/default-post-image.jpg'}
                    alt={title}
                    width={600}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-gray-800">
                  <div className="flex-1">
                    <Link href={`/blog/${slug}`} className="mt-2 block">
                      <p className="line-clamp-2 text-xl font-semibold text-gray-900 transition-colors duration-300 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400">
                        {title}
                      </p>
                    </Link>
                    <p className="mt-3 line-clamp-2 text-base text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    {tags.length > 0 && <Tag text={tags[0]} />}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded bg-primary-500 px-3 py-1 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded bg-primary-500 px-3 py-1 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
