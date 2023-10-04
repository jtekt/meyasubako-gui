import { createSignal, Show } from "solid-js"
import { FaRegularThumbsUp, FaRegularThumbsDown } from "solid-icons/fa"
import { votes, setVotes } from "../votesStore"
import "./button.css"

export default ({ type, item, onUpdate }: any) => {
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [loading, setLoading] = createSignal(false)

  const vote = async () => {
    setLoading(true)
    const url = `${VITE_MENDOKUSAI_API_URL}/items/${item.id}/${type}`
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setVotes([...votes, { item_id: item.id, type }])
    localStorage.setItem("votes", JSON.stringify(votes))
    onUpdate(data)
    setLoading(false)
  }

  const foundVote = votes.find((vote: any) => vote.item_id === item.id)
  const btnClass = () => (foundVote?.type === type ? "btn clicked" : "btn")

  return (
    <button
      class={btnClass()}
      onClick={() => vote()}
      disabled={loading() || !!foundVote}
    >
      <Show when={loading()}>
        <span class="loading loading-spinner" />
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
