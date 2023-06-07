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
        <button type="button" className="bg-white hover:bg-[#375bd2] hover:text-white border border-[#375bd2] text-[#375bd2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>&nbsp;&nbsp;Try This Function In Playground
        </button>
      <p className="text-lg leading-relaxed mb-4">{post}</p>
      <PostBody content={content} />
      <div className="text-md mb-4 text-gray-300 text-right hidden">
        <DateFormatter dateString={date} />
      </div>
    </div>

  )
}

export default PostPreview


