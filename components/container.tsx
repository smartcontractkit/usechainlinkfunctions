type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container mx-auto sm:px-0 md:px-5">{children}</div>
}

export default Container
