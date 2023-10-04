import { createResource, createSignal, onMount, Show } from "solid-js"
import { useParams, A } from "@solidjs/router"
import { FaSolidArrowLeft } from "solid-icons/fa"
import { formatDate } from "./utils"
import VoteButton from "./components/VoteButton"
import ItemsTable from "./components/ItemsTable"
import NewItemForm from "./components/NewItemForm"

export default () => {
  const [item, setItem] = createSignal<any>(null)
  const [comments, setComments] = createSignal([])
  const [loading, setLoading] = createSignal(false)
  const params = useParams()

  // TODO: Most likely not the right use of createResource()
  const [noIdeaWhatToDoWithThis] = createResource(() => params.id, fetchItem)

  async function fetchItem() {
    setItem(null)
    setLoading(true)
    const url = `http://172.16.98.151:7070/items/${params.id}`
    const response = await fetch(url)
    const item = await response.json()
    setItem(item)
    setComments(item.comments)
    setLoading(false)
  }

  onMount(() => {
    fetchItem()
  })

  function handleCommentUpdate(i: any) {
    const itemsCopy = comments().slice()
    const foundIndex = itemsCopy.findIndex(({ id }: any) => id === i.id)
    // @ts-ignore
    itemsCopy.splice(foundIndex, 1, i)
    setComments(itemsCopy)
  }

  return (
    <>
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg" />
        </div>
      </Show>
      <Show when={item()}>
        <p class="my-4">
          <Show when={item().parent_id}>
            <A href={`/items/${item().parent_id}`} class="btn">
              <FaSolidArrowLeft />
              <span>{item().parent_id}</span>
            </A>
          </Show>
          <Show when={!item().parent_id}>
            <A href="/" class="btn">
              <FaSolidArrowLeft />
              All items
            </A>
          </Show>
        </p>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <p>{formatDate(item().time)}</p>
            <h2 class="card-title">{item().content}</h2>
            <div class="card-actions justify-end flex items-center">
              <VoteButton item={item()} onUpdate={setItem} type="like" />
              <span>{item().likes}</span>
              <VoteButton item={item()} onUpdate={setItem} type="dislike" />
            </div>
          </div>
        </div>

        <NewItemForm parent_id={item().id} />

        <ItemsTable items={comments} onUpdate={handleCommentUpdate} />
      </Show>
    </>
  )
}
