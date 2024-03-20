import { createEffect, createSignal, onMount, Show } from "solid-js"
import { IoLogIn } from "solid-icons/io"
import { FaSolidUser, FaSolidLock } from "solid-icons/fa"

export default () => {
  const [username, setusername] = createSignal("")
  const [password, setPassword] = createSignal("")

  const handleFormSubmit = async (event: any) => {
    alert("Not implemented")
  }

  return (
    <>
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
          <button class="btn btn-primary" type="submit">
            <IoLogIn size={24} />
            <span>Login</span>
          </button>
        </div>
      </form>
    </>
  )
}
