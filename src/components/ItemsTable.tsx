import { For, createEffect, createSignal, Show, on } from "solid-js"
import { formatDate, httpRequest } from "../utils"
import { FaRegularComment } from "solid-icons/fa"
import { A, useParams, useLocation } from "@solidjs/router"
import { createIntersectionObserver } from "@solid-primitives/intersection-observer"
import VoteButton from "./VoteButton"
import SortButtons from "./SortButtons"
import SearchBox from "./SearchBox"
import { t } from "./LocaleSelector"

export default ({ title = t("items") }: any) => {
  const { VITE_MEYASUBAKO_API_URL } = import.meta.env

  const [items, setItems] = createSignal<any>([])
  const [total, setTotal] = createSignal(0)
  const [loading, setLoading] = createSignal(false)
  const [intersectionObserverTargets, setIntersectionObserverTargets] =
    createSignal<Element[]>([])

  const params = useParams()
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
    const url = new URL(`${VITE_MEYASUBAKO_API_URL}/items${location.search}`)

    url.searchParams.set("skip", String(items().length))
    url.searchParams.set("take", String(take))
    if (params.id) url.searchParams.set("parent_id", params.id)

    const data = await httpRequest(url)

    setItems([...items(), ...data.items])
    setTotal(data.total)
    setLoading(false)

    if (intersecting && !loading() && items().length < total()) fetchItems()
  }

  function handleUpdate(i: any) {
    const itemsCopy = items().slice()
    const foundIndex = itemsCopy.findIndex(({ id }: any) => id === i.id)
    // @ts-ignore
    itemsCopy.splice(foundIndex, 1, i)
    setItems(itemsCopy)
  }

  return (
    <div class="card bg-base-100 shadow-xl my-4">
      <div class="card-body">
        <h2 class="card-title">
          {title} ({total()})
        </h2>
        <Show when={total()}>
          <div>
            <SearchBox />
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>
                  {t("date")}
                  <SortButtons sort="time" />
                </th>
                <th>{t("content")}</th>
                <th>
                  {t("likes")}
                  <SortButtons sort="likes" />
                </th>
                <th>{t("comments")}</th>
              </tr>
            </thead>
            <tbody>
              <For each={items()}>
                {(item: any) => (
                  <tr>
                    <td class="text-gray-500">{formatDate(item.time)}</td>
                    <td class="w-full">
                      <A
                        class="w-full"
                        href={`/items/${item.id}`}
                        style="display: block; white-space: pre-line;"
                      >
                        {item.content}
                      </A>
                    </td>
                    <td class="flex items-center gap-2 ">
                      <VoteButton
                        item={item}
                        onUpdate={handleUpdate}
                        type="like"
                      />
                      <span class="basis-10 text-center text-lg">
                        {item.likes}
                      </span>
                      <VoteButton
                        item={item}
                        onUpdate={handleUpdate}
                        type="dislike"
                      />
                    </td>
                    <td class="text-center">
                      <A
                        href={`/items/${item.id}`}
                        class="btn flex flex-nowrap btn-outline"
                      >
                        <FaRegularComment size={18} />
                        {item.comments.length}
                      </A>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Show>
        <Show when={loading()}>
          <div class="text-center">
            <span class="loading loading-spinner loading-lg" />
          </div>
        </Show>
        <div ref={(el) => setIntersectionObserverTargets((p) => [...p, el])} />
      </div>
    </div>
  )
}
