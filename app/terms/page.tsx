import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Terms of Use' })

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 xl:max-w-3xl xl:px-0">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Terms of Use
        </h1>
        <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
          Last updated: 13 October 2024
        </p>
      </div>
      <div className="dark:prose-dark prose max-w-none">
        {termsOfUse.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {section.title}
            </h2>
            <div className="border-l-4 border-gray-200 pl-4 dark:border-gray-700">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

const termsOfUse = [
  {
    title: '1. Acceptance of Terms',
    content: (
      <p className="text-gray-800 dark:text-gray-300">
        By accessing and using this website, you accept and agree to be bound by the terms and
        provisions of this agreement.
      </p>
    ),
  },
  {
    title: '2. Use of the Website',
    content: (
      <p className="text-gray-800 dark:text-gray-300">
        You agree to use the website for lawful purposes only and in a way that does not infringe
        the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
      </p>
    ),
  },
  {
    title: '3. Intellectual Property',
    content: (
      <p className="text-gray-800 dark:text-gray-300">
        The content on this website, including without limitation, the text, software, scripts,
        graphics, photos, sounds, music, videos, interactive features and the like and the
        trademarks, service marks and logos contained therein, are owned by or licensed to Thevesh
        Theva.
      </p>
    ),
  },
  {
    title: '4. Personal Nature of Content',
    content: (
      <p className="text-gray-800 dark:text-gray-300">
        You acknowledge that this is a personal website. All opinions, views, and content expressed
        herein are solely those of the author, Thevesh Theva, and do not represent or reflect the
        views, opinions, or positions of any other individuals, organizations, institutions,
        employers, clients, or any other entities, past or present, with which the author may be or
        may have been affiliated.
      </p>
    ),
  },
  {
    title: '5. Content Reproduction for Media Agencies',
    content: (
      <>
        <p className="text-gray-800 dark:text-gray-300">
          Media agencies registered in Malaysia are granted permission to reproduce or quote any
          material from this website, subject to the following conditions:
        </p>
        <ul className="mt-2 list-disc pl-5 text-gray-800 dark:text-gray-300">
          <li>
            Proper attribution must be given to Thevesh Theva as the original author of the content.
          </li>
          <li>
            The content must be represented such that it maintains its original context and intent.
          </li>
          <li>
            In attributing the content, no reference should be made to any organizations,
            institutions, societies, or other entities. The site is personal in nature and all
            opinions expressed are solely those of the author.
          </li>
          <li>
            The reproduction or quotation of the content does not imply any endorsement or
            affiliation between the author and the media agency.
          </li>
        </ul>
      </>
    ),
  },
]
