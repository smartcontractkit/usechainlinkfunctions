import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import PostBody from '../components/post-body'

type Props = {
  title: string
  coverImage: string
  date: string
  summary: string
  author: Author
  slug: string
  post: string,
  content: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  summary,
  author,
  slug,
  post,
  content,
}: Props) => {
  return (
    <div className="border-solid border-l-2  border-black md:border-neutral-200 pl-5">
      <div >
        {/*

        <CoverImage slug={slug} title={title} src={coverImage} />
        */}
      </div>
      <h3 className="text-3xl mb-3 leading-snug font-bold ">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
        
      </h3>
      <div className=""><span className="italic text-gray-400">Submitted by: </span>
        <a
          href={author.link}
          target="_blank"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          <Avatar name={author.name} />

        </a>
        
      </div>
      
      <div className="w-full md:w-3/4 py-8 pr-2">{summary}</div>
      
      <p className="text-lg leading-relaxed mb-4">{post}</p>
      <PostBody content={content} />
      <div className="text-md mb-4 text-gray-300 text-right">
        <DateFormatter dateString={date} />
      </div>
    </div>
    
  )
}

export default PostPreview


