type Props = {
  title: string
  info?: string
}

export const ProfileInfo = ({ title, info }: Props) => {
  if (!info) {
    return null
  }

  return (
    <p className="font-simibold">
      <span className="text-grey-500 mr-2">{title}</span>
      {info}
    </p>
  )
}
