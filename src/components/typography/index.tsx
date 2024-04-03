type Props = {
  children: string
  size?: string
}

export const Typography = ({ children, size = "text-xl" }: Props) => {
  return <p className={`${size}`}>{children}</p>
}
