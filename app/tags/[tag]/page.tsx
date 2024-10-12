'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 12

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const posts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const displayPosts = useMemo(
    () => posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [posts, currentPage]
  )

  if (!mounted) return null

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            {tag}
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          <div className="mb-2 mr-5 mt-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {posts.length} post{posts.length > 1 ? 's' : ''}
            </h2>
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
                  quality={95}
                  priority={true}
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
    </>
  )
}
