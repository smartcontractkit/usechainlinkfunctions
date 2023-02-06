import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  summary: string
  ogImage: {
    url: string
  }
  post: string
  content: string
}

export default PostType
