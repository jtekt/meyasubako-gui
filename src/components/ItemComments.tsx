import { createEffect, createSignal, Show, on } from "solid-js"
import { useParams, useLocation } from "@solidjs/router"
import ItemsTable from "./ItemsTable"
import { createIntersectionObserver } from "@solid-primitives/intersection-observer"

export default () => {
  // TODO: This is highly redundant with items.tsx
  // IDEA: move to itemsTable
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [items, setItems] = createSignal<any>([])
  const [total, setTotal] = createSignal(0)
  const [loading, setLoading] = createSignal(false)
  const [intersectionObserverTargets, setIntersectionObserverTargets] =
    createSignal<Element[]>([])

  const params = useParams() // This is different
  const location = useLocation()
  const take = 50
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
    url.searchParams.set("parent_id", params.id)

    const response = await fetch(url)
    const data = await response.json()

    setItems([...items(), ...data.items])
    setTotal(data.total)
    setLoading(false)

    if (intersecting) await fetchItems()
  }

  function handleUpdate(i: any) {
    const itemsCopy = items().slice()
    const foundIndex = itemsCopy.findIndex(({ id }: any) => id === i.id)
    // @ts-ignore
    itemsCopy.splice(foundIndex, 1, i)
    setItems(itemsCopy)
  }

  return (
    <>
      <ItemsTable
        items={items}
        onUpdate={handleUpdate}
        title="コメント"
        total={total}
      />
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg" />
        </div>
      </Show>
      <div ref={(el) => setIntersectionObserverTargets((p) => [...p, el])} />
    </>
  )
}
