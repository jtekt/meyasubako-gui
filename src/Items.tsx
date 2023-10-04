import { createSignal, onMount, Show } from "solid-js"
import NewItemForm from "./components/NewItemForm"
import ItemsTable from "./components/ItemsTable"

export default () => {
  const [items, setItems] = createSignal([])
  const [loading, setLoading] = createSignal(false)

  const fetchItems = async () => {
    setLoading(true)
    setItems([])
    const url = "http://172.16.98.151:7070/items"
    const response = await fetch(url)
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
