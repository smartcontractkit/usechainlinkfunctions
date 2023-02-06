import markdownStyles from './markdown-styles.module.css'
import { CodeBlock, CopyBlock, atomOneLight, codepen, github, googlecode } from "react-code-blocks";


type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className=" mx-auto text-xs font-mono m-100">
      <CopyBlock
      text={content}
      language={'javascript'}
      showLineNumbers={true}
      startingLineNumber={1}
      theme={atomOneLight}
      codeBlock
    />
      </div>
    

  )
}

export default PostBody
