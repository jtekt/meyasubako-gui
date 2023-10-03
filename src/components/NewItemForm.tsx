import { createSignal } from "solid-js"
import { IoSend } from "solid-icons/io"

export default () => {
  const [content, setContent] = createSignal("")

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    const url = "http://172.16.98.151:7070/items"
    const options = {
      method: "POST",
      body: JSON.stringify({ content: content() }),
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(url, options)
    const { id } = await response.json()
  }

  return (
    <form onsubmit={handleFormSubmit} class="flex gap-2 items-center ">
      <input
        type="text"
        onInput={(event: any) => {
          setContent(event?.target?.value)
        }}
        placeholder="New item"
        class="input w-full max-w-xs flex-grow"
      />
      <button class="btn" type="submit">
        <IoSend />
      </button>
    </form>
  )
}
