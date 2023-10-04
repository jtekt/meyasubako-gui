import { createEffect, createSignal, onMount, Show } from "solid-js"
import { useParams, useSearchParams, A } from "@solidjs/router"
import ItemsTable from "./ItemsTable"

export default ({ item }: any) => {
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [comments, setComments] = createSignal([])
  const [loading, setLoading] = createSignal(false)
  const [searchParams] = useSearchParams()
  const params = useParams()

  createEffect(() => {
    fetchComments()
  })

  // TODO: in a component
  async function fetchComments() {
    setLoading(true)
    const url = new URL(`${VITE_MENDOKUSAI_API_URL}/items/`)

    // TODO: find better way
    Object.keys(searchParams).forEach((key) =>
      url.searchParams.set(key, searchParams[key])
    )

    url.searchParams.set("parent_id", params.id)

    const response = await fetch(url)
    const { items } = await response.json()

    setComments(items)
    setLoading(false)
  }

  onMount(() => {
    fetchComments()
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
      <Show when={!loading()}>
        <ItemsTable
          items={comments}
          onUpdate={handleCommentUpdate}
          title="コメント"
        />
      </Show>
    </>
  )
}
