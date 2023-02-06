import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 md:mb-12"><span className="italic text-gray-800">Submitted by: </span>
        <a
          href={author.link}
          target="_blank"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          <Avatar name={author.name} />

        </a>
        
      </div>

    </>
  )
}

export default PostHeader
