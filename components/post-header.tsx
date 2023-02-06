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
      <div className="hidden md:block md:mb-12"><span>Submitted by: </span>
        <a
          href="{author.link}"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          <Avatar name={author.name} />

        </a>
        
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {/*  <CoverImage title={title} src={coverImage} />*/}

      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} />
        </div>

      </div>
    </>
  )
}

export default PostHeader
