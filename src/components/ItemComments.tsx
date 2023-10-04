import { createEffect, createSignal, onMount, Show } from "solid-js"
import { useParams, useSearchParams, A } from "@solidjs/router"
import ItemsTable from "./ItemsTable"

export default ({ item }: any) => {
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
    const url = new URL(`http://172.16.98.151:7070/items/`)

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
        <ItemsTable items={comments} onUpdate={handleCommentUpdate} />
      </Show>
    </>
  )
}
