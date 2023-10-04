import { createEffect, createSignal, onMount, Show } from "solid-js"
import { useParams, useSearchParams, A } from "@solidjs/router"
import { FaSolidArrowLeft } from "solid-icons/fa"
import { formatDate } from "./utils"
import VoteButton from "./components/VoteButton"
import ItemsTable from "./components/ItemsTable"
import NewItemForm from "./components/NewItemForm"
import ItemComments from "./components/ItemComments"

export default () => {
  const [item, setItem] = createSignal<any>(null)
  const [comments, setComments] = createSignal([])
  const [loading, setLoading] = createSignal(false)
  const [searchParams] = useSearchParams()
  const params = useParams()

  createEffect(() => {
    fetchItem()
  })

  async function fetchItem() {
    setItem(null)
    setLoading(true)
    const url = new URL(`http://172.16.98.151:7070/items/${params.id}`)

    // TODO: find better way
    Object.keys(searchParams).forEach((key) =>
      url.searchParams.set(key, searchParams[key])
    )

    const response = await fetch(url)
    const item = await response.json()
    setItem(item)

    setLoading(false)
  }

  onMount(() => {
    fetchItem()
  })

  return (
    <>
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg" />
        </div>
      </Show>
      <Show when={item()}>
        <p class="my-4">
          <A
            href={item().parent_id ? `/items/${item().parent_id}` : "/"}
            class="btn"
          >
            <FaSolidArrowLeft />
            Return
          </A>
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

        <ItemComments item={item()} />
      </Show>
    </>
  )
}
