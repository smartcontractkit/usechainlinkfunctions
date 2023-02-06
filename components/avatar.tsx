type Props = {
  name: string
}

const Avatar = ({ name }: Props) => {
  return (
    <span className="">
      <div className="text-xl font-bold">{name}</div>
    </span>
  )
}

export default Avatar
