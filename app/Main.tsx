'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
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
  const [mounted, setMounted] = useState(false)
  const [selectedTag, setSelectedTag] = useState('All Posts')
  const [currentPage, setCurrentPage] = useState(1)

  // Use useEffect to set mounted to true after initial render
  useEffect(() => {
    setMounted(true)
  }, [])

  const tagCounts = tagData as Record<string, number>
  const sortedTags = useMemo(() => {
    const tagKeys = Object.keys(tagCounts)
    return [
      'All Posts',
      ...tagKeys.sort((a, b) => {
        const countDiff = tagCounts[b] - tagCounts[a]
        return countDiff !== 0 ? countDiff : a.localeCompare(b)
      }),
    ]
  }, [tagCounts])

  const filteredPosts = useMemo(
    () =>
      selectedTag === 'All Posts' ? posts : posts.filter((post) => post.tags.includes(selectedTag)),
    [selectedTag, posts]
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const displayPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filteredPosts, currentPage]
  )

  const formatTagName = (tag: string) => {
    return tag
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const totalPosts = posts.length

  // Wrap the return statement in a condition
  if (!mounted) {
    return null // or a loading spinner
  }

  return (
    <>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          I write here
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
        <ViewCounter />
      </div>
      {/* Divider line below the header */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pb-6" /> {/* This empty div creates space for the divider */}
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex flex-wrap justify-center space-x-2">
            {sortedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag)
                  setCurrentPage(1)
                }}
                className={`m-1 rounded-lg px-3 py-1 text-sm font-medium transition-colors duration-200
                  ${
                    selectedTag === tag
                      ? 'bg-sky-200 text-sky-800 dark:bg-sky-700 dark:text-sky-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                {tag === 'All Posts' ? `${tag} (${totalPosts})` : formatTagName(tag)}{' '}
                {tag !== 'All Posts' && `(${tagCounts[tag]})`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 xl:grid-cols-3">
        {!displayPosts.length && 'No posts found.'}
        {displayPosts.map((post) => {
          const { slug, date, title, summary, tags, images } = post
          return (
            <Link
              href={`/blog/${slug}`}
              key={slug}
              className="flex h-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800"
            >
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={images?.[0] || '/static/images/default-post-image.jpg'}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  quality={95} // Increase quality
                  priority={true} // Load image with higher priority
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-gray-800">
                <div className="flex-1">
                  <h2 className="line-clamp-2 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400">
                    {title}
                  </h2>
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
            </Link>
          )
        })}
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
