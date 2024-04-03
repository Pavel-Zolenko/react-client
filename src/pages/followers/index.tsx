import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"

export const Followers = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.followers.length > 0 ? (
    <div className="flex flex-col gap-5">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="blok">
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У Вас нет подписчиков</h1>
  )
}
