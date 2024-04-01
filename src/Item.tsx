import { createEffect, createSignal, onMount, Show } from "solid-js"
import { useParams } from "@solidjs/router"
import { formatDate, httpRequest } from "./utils"
import VoteButton from "./components/VoteButton"
import NewItemForm from "./components/NewItemForm"
import ItemsTable from "./components/ItemsTable"
import Breadcrumbs from "./components/Breadcrumbs"
import { FaRegularCalendar, FaRegularUser } from "solid-icons/fa"
import { authData } from "./store"

export default () => {
  const [item, setItem] = createSignal<any>(null)
  const [loading, setLoading] = createSignal(false)
  const params = useParams()

  const { VITE_MEYASUBAKO_API_URL, VITE_USER_INFO_URL } = import.meta.env

  createEffect(() => {
    fetchItem()
  })

  async function fetchItem() {
    setItem(null)
    setLoading(true)
    const url = new URL(`${VITE_MEYASUBAKO_API_URL}/items/${params.id}`)
    const item = await httpRequest(url)
    setItem(item)
    setLoading(false)
  }

  async function getUserInfo() {
    setLoading(true)
    if (!VITE_USER_INFO_URL || !authData.jwt) return
    // PROBLEM: what if using another user manager?
    const url = VITE_USER_INFO_URL.replace(":user_id", item().user_id)
    const user = await httpRequest(url)
    setItem({ ...item(), user })
    setLoading(false)
  }

  onMount(async () => {
    await fetchItem()
    if (VITE_USER_INFO_URL && item().user_id) getUserInfo()
  })

  return (
    <>
      <Show when={loading()}>
        <div class="text-center">
          <span class="loading loading-spinner loading-lg m-8" />
        </div>
      </Show>
      <Show when={!loading() && item()}>
        <Breadcrumbs item={item} />

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex gap-6">
              <div class="flex gap-2 items-center">
                <FaRegularCalendar />
                <span>{formatDate(item().time)}</span>
              </div>
              <Show when={item().user}>
                <div class="flex gap-2 items-center">
                  <FaRegularUser />
                  <span>{item().user.display_name}</span>
                </div>
              </Show>
            </div>
            <h2 class="card-title" style="white-space: pre-line;">
              {item().content}
            </h2>
            <div class="card-actions flex items-center">
              <VoteButton item={item()} onUpdate={setItem} type="like" />
              <span>{item().likes}</span>
              <VoteButton item={item()} onUpdate={setItem} type="dislike" />
            </div>
          </div>
        </div>

        <NewItemForm parent_id={item().id} type="コメント" />

        <ItemsTable title="コメント" />
      </Show>
    </>
  )
}
