import { createSignal, onMount, For, type Component } from "solid-js"
import NewItemForm from "./components/NewItemForm"
import VoteControls from "./components/VoteControls"
import VoteButton from "./components/VoteButton"

import { A } from "@solidjs/router"

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

  onMount(() => {
    fetchItems()
  })

  const handleUpdate = (i: any) => {
    const itemsCopy = items().slice()
    const foundIndex = itemsCopy.findIndex(({ id }: any) => id === i.id)
    console.log(i)
    itemsCopy.splice(foundIndex, 1, i)
    setItems(itemsCopy)
  }

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
                      <A href={`/items/${item.id}`}>{item.content}</A>
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
