import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Link } from "@nextui-org/react"
import { ErrorMessage } from "../components/error-message"
import { hasErrorField } from "../utils/has-error-field"
import { Input } from "../components/input"
import { useLazyCurrentQuery, useLoginMutation } from "../app/services/userApi"

type LoginType = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Login = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate("/")
    } catch (err) {
      console.log(err)
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />

      {error && <ErrorMessage error={error} />}

      <p className="text-center text-small">
        Нет аккаунта? {""}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
