import { createSignal, createEffect, onMount, Show, on } from "solid-js"
import NewItemForm from "./components/NewItemForm"
import ItemsTable from "./components/ItemsTable"
import { useLocation } from "@solidjs/router"
import { createIntersectionObserver } from "@solid-primitives/intersection-observer"

export default () => {
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [intersectionObserverTargets, setIntersectionObserverTargets] =
    createSignal<Element[]>([])

  const [items, setItems] = createSignal<any[]>([])
  const [total, setTotal] = createSignal(0)
  const [loading, setLoading] = createSignal(false)
  const location = useLocation()
  const take = 5
  let intersecting = false

  createEffect(
    on(
      () => location.search,
      () => {
        setItems([])
        setTotal(0)
        fetchItems()
      }
    )
  )

  createIntersectionObserver(intersectionObserverTargets, (entries) => {
    intersecting = entries.some((e) => e.isIntersecting)
    if (intersecting && !loading() && items().length < total()) fetchItems()
  })

  async function fetchItems() {
    setLoading(true)
    const url = new URL(`${VITE_MENDOKUSAI_API_URL}/items${location.search}`)

    url.searchParams.set("skip", String(items().length))
    url.searchParams.set("take", String(take))

    const response = await fetch(url.toString())
    const data = await response.json()
    setItems([...items(), ...data.items])
    setTotal(data.total)
    setLoading(false)

    if (intersecting) await fetchItems()
  }

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
      <ItemsTable items={items} onUpdate={handleUpdate} total={total} />
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg" />
        </div>
      </Show>
      <div ref={(el) => setIntersectionObserverTargets((p) => [...p, el])} />
    </>
  )
}
