import { createSignal, Show } from "solid-js"
import { FaRegularThumbsUp, FaRegularThumbsDown } from "solid-icons/fa"
import { votes, setVotes } from "../store"
import { httpRequest } from "../utils"

export default ({ type, item, onUpdate }: any) => {
  const { VITE_MEYASUBAKO_API_URL } = import.meta.env

  const [loading, setLoading] = createSignal(false)

  const findVote = () => votes.find((vote: any) => vote.item_id === item.id)
  const buttonHasBeenClicked = () => findVote()?.type === type
  const getClass = () => (buttonHasBeenClicked() ? "btn btn-primary" : "btn")

  async function vote() {
    await sendRequest(type)
    setVotes([...votes, { item_id: item.id, type }])
    localStorage.setItem("votes", JSON.stringify(votes))
  }

  async function cancelVote() {
    const cancelMap: any = { like: "dislike", dislike: "like" }
    await sendRequest(cancelMap[type])
    const newVotes = votes.slice().filter(({ item_id }) => item_id !== item.id)
    setVotes(newVotes)
    localStorage.setItem("votes", JSON.stringify(votes))
  }

  async function sendRequest(param: string) {
    setLoading(true)
    const url = `${VITE_MEYASUBAKO_API_URL}/items/${item.id}/${param}`
    const options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    const data = await httpRequest(url, options)
    onUpdate(data)
    setLoading(false)
  }

  function handleClick() {
    if (buttonHasBeenClicked()) cancelVote()
    else vote()
  }

  return (
    <button
      class={getClass()}
      onClick={handleClick}
      disabled={loading() || (!!findVote() && !buttonHasBeenClicked())}
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
