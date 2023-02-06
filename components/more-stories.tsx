import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import PostBody from '../components/post-body'
import type PostType from '../interfaces/post'




type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section className="mt-32">
      {/* 
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
        Chainlink Function Examples
      </h2>
      */}
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            summary={post.summary}
            post={post.post}
            content={post.content}
          />
          
        ))}
      </div>
    </section>
  )
}

export default MoreStories
