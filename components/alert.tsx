import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '../lib/constants'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'bg-[#375bd2] border-neutral-800 text-white': preview,
        'bg-[#375bd2] border-neutral-200 text-white': !preview,
      })}
    >
      <Container>
        <div className="p-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-teal-300 duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              Got a cool example to share? Add your Function code to this site.{' '}
              <a
                href={`https://github.com/bryanjowers/usechainlinkfunctions`}
                target="_blank"
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                Submit it here
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
