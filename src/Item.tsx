import { createEffect, createSignal, onMount, Show } from "solid-js"
import { useParams, useSearchParams, A } from "@solidjs/router"
import { FaSolidArrowLeft } from "solid-icons/fa"
import { formatDate } from "./utils"
import VoteButton from "./components/VoteButton"
import NewItemForm from "./components/NewItemForm"
import ItemComments from "./components/ItemComments"

export default () => {
  const [item, setItem] = createSignal<any>(null)
  const [loading, setLoading] = createSignal(false)
  const [searchParams] = useSearchParams()
  const params = useParams()

  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  createEffect(() => {
    fetchItem()
  })

  async function fetchItem() {
    setItem(null)
    setLoading(true)
    const url = new URL(`${VITE_MENDOKUSAI_API_URL}/items/${params.id}`)

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
          {/* TODO: simply go back */}
          <a href="javascript:history.back()" class="btn">
            <FaSolidArrowLeft />
            戻る
          </a>
        </p>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <p>{formatDate(item().time)}</p>
            <h2 class="card-title" style="white-space: pre-line;">
              {item().content}
            </h2>
            <div class="card-actions justify-end flex items-center">
              <VoteButton item={item()} onUpdate={setItem} type="like" />
              <span>{item().likes}</span>
              <VoteButton item={item()} onUpdate={setItem} type="dislike" />
            </div>
          </div>
        </div>

        <NewItemForm parent_id={item().id} type="コメント" />

        <ItemComments item={item()} />
      </Show>
    </>
  )
}
