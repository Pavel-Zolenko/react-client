import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handeleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button color="default" className="gap-2" onClick={handeleLogout}>
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
