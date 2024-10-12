import siteMetadata from '@/data/siteMetadata'

export function genPageMetadata({
  title,
  description,
  ...rest
}: {
  title: string
  description?: string
  [key: string]: unknown
}) {
  return {
    title: title === siteMetadata.title ? title : `${title} | ${siteMetadata.title}`,
    description: description || siteMetadata.description,
    ...rest,
  }
}
