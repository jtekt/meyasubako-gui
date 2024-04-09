import { createSignal, Show } from "solid-js"
import { IoLogIn, IoLogOut } from "solid-icons/io"
import { FaSolidUser, FaSolidLock } from "solid-icons/fa"
import { authData, setAuthData } from "./store"
import { useNavigate } from "@solidjs/router"
import axios from "axios"
export default () => {
  const { VITE_LOGIN_URL } = import.meta.env

  const [username, setusername] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [loggingIn, setLoggingIn] = createSignal(false)
  const navigate = useNavigate()

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    try {
      setLoggingIn(true)
      const { data } = await axios.post(VITE_LOGIN_URL, {
        username: username(),
        password: password(),
      })
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`
      setAuthData(data)
      navigate("/")
    } catch (error) {
      alert("Login failed")
      console.error(error)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"]
    setAuthData({ user: null, jwt: null })
  }

  return (
    <>
      <Show when={!authData.user}>
        <form onsubmit={handleFormSubmit} class="flex flex-col gap-4 mt-12">
          <h2 class="flex justify-center text-4xl my-4">目安箱</h2>
          <div class="flex gap-4 items-center justify-center">
            <FaSolidUser />
            <input
              class="input input-bordered"
              type="text"
              placeholder="Username"
              onInput={(event: any) => {
                setusername(event?.target?.value)
              }}
            />
          </div>
          <div class="flex gap-4 items-center justify-center">
            <FaSolidLock />
            <input
              class="input input-bordered"
              type="password"
              placeholder="Password"
              onInput={(event: any) => {
                setPassword(event?.target?.value)
              }}
            />
          </div>
          <div class="flex justify-center">
            <button
              class="btn btn-primary"
              type="submit"
              disabled={loggingIn()}
            >
              <IoLogIn size={24} />
              <span>Login</span>
            </button>
          </div>
        </form>
      </Show>
      <Show when={authData.user}>
        <div class="flex flex-col gap-4 mt-12 items-center">
          <div>Logged in as {authData.user.display_name} </div>
          <button class="btn btn-primary" onclick={handleLogout}>
            <IoLogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </Show>
    </>
  )
}
