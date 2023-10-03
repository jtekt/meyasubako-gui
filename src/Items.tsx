import { createSignal, onMount, For, type Component } from "solid-js"
import { FaRegularThumbsUp, FaRegularThumbsDown } from "solid-icons/fa"
import NewItemForm from "./components/NewItemForm"
export default () => {
  const [items, setItems] = createSignal([])

  const fetchItems = async () => {
    const url = "http://172.16.98.151:7070/items"
    const response = await fetch(url)
    const { items } = await response.json()
    setItems(items)
  }

  const formatDate = (raw: string) =>
    new Date(raw).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })

  onMount(async () => {
    await fetchItems()
  })

  return (
    <div>
      <main>
        <NewItemForm />
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Content</th>
                <th>Likes</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <For each={items()}>
                {(item: any) => (
                  <tr>
                    <td>{formatDate(item.time)}</td>
                    <td>
                      <a href="/items/1">{item.content}</a>
                    </td>
                    <td class="flex items-center gap-2">
                      <button class="btn">
                        <FaRegularThumbsUp />
                      </button>
                      <span>{item.likes}</span>
                      <button class="btn">
                        <FaRegularThumbsDown />
                      </button>
                    </td>
                    <td>{item.comments.length}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
