import { createSignal, onMount, Show } from "solid-js"
import { useParams, A } from "@solidjs/router"
import VoteButton from "./components/VoteButton"

export default () => {
  const [item, setItem] = createSignal<any>(null)

  const fetchItem = async () => {
    const { id } = useParams()
    const url = `http://172.16.98.151:7070/items/${id}`
    const response = await fetch(url)
    const item = await response.json()
    setItem(item)
  }

  const handleUpdate = (i: any) => {
    setItem(i)
  }

  onMount(() => {
    fetchItem()
  })

  return (
    <main>
      <p>
        <A href="/">Return</A>
      </p>
      <Show when={item()}>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{item().time}</h2>
            <p>{item().content}</p>
            <div class="card-actions justify-end flex items-center">
              <VoteButton item={item()} onUpdate={handleUpdate} type="like" />
              <span>{item().likes}</span>
              <VoteButton
                item={item()}
                onUpdate={handleUpdate}
                type="dislike"
              />
            </div>
          </div>
        </div>
      </Show>
    </main>
  )
}
