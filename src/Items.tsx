import { createSignal, createEffect, onMount, Show } from "solid-js"
import NewItemForm from "./components/NewItemForm"
import ItemsTable from "./components/ItemsTable"
import { useSearchParams } from "@solidjs/router"

export default () => {
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [items, setItems] = createSignal([])
  const [loading, setLoading] = createSignal(false)
  const [searchParams] = useSearchParams()
  createEffect(() => {
    fetchItems()
  })

  async function fetchItems() {
    setLoading(true)
    setItems([])
    const url = new URL(`${VITE_MENDOKUSAI_API_URL}/items`)

    Object.keys(searchParams).forEach((key) =>
      url.searchParams.set(key, searchParams[key])
    )

    const response = await fetch(url.toString())
    const data = await response.json()
    setItems(data.items)
    setLoading(false)
  }

  onMount(() => {
    fetchItems()
  })

  const handleUpdate = (i: any) => {
    const itemsCopy = items().slice()
    const foundIndex = itemsCopy.findIndex(({ id }: any) => id === i.id)
    // @ts-ignore
    itemsCopy.splice(foundIndex, 1, i)
    setItems(itemsCopy)
  }

  return (
    <>
      <NewItemForm />
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg" />
        </div>
      </Show>
      <Show when={!loading()}>
        <ItemsTable items={items} onUpdate={handleUpdate} />
      </Show>
    </>
  )
}
