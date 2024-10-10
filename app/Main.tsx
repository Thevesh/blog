import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 12

export default function Home({ posts }) {
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
        </div>
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
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
      {posts.length > MAX_DISPLAY && (
        <div className="mt-8 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
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
