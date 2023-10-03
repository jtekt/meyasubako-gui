import { createSignal, onMount, Show } from "solid-js"
import { FaRegularThumbsUp, FaRegularThumbsDown } from "solid-icons/fa"

export default ({ type, item, onUpdate }: any) => {
  const [loading, setLoading] = createSignal(false)

  const vote = async () => {
    setLoading(true)
    const url = `http://172.16.98.151:7070/items/${item.id}/${type}`
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    onUpdate(data)
    setLoading(false)
  }

  return (
    <button class="btn" onClick={() => vote()} disabled={loading()}>
      <Show when={loading()}>
        <span class="loading loading-spinner"></span>
      </Show>
      <Show when={!loading()}>
        <Show when={type === "like"}>
          <FaRegularThumbsUp size={24} />
        </Show>
        <Show when={type === "dislike"}>
          <FaRegularThumbsDown size={24} />
        </Show>
      </Show>
    </button>
  )
}
