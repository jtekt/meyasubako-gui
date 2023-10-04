import { For } from "solid-js"
import { formatDate } from "../utils"
import { A, useSearchParams } from "@solidjs/router"
import VoteButton from "./VoteButton"
import SortButton from "./SortButton"
import {
  FaRegularCommentDots,
  FaRegularThumbsUp,
  FaRegularCalendar,
} from "solid-icons/fa"
import { BsCardText } from "solid-icons/bs"

export default ({ items, onUpdate }: any) => {
  const [searchParams, setSearchParams] = useSearchParams()
  function sortBy(sort: string) {
    setSearchParams({ ...searchParams, sort })
  }

  return (
    <div class="card bg-base-100 shadow-xl my-4">
      <div class="card-body">
        <h2 class="card-title">Items</h2>
        <div class="">
          {/* TODO: sorting */}
          {/* TODO: infinite scroll */}
          <table class="table">
            <thead>
              <tr>
                <th>
                  <SortButton sort="time" text="Date" />
                </th>
                <th>Content</th>
                <th>
                  <SortButton sort="likes" text="Likes" />
                </th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <For each={items()}>
                {(item: any) => (
                  <tr>
                    <td>{formatDate(item.time)}</td>
                    <td class="overflow-hidden">
                      <A href={`/items/${item.id}`}>{item.content}</A>
                    </td>
                    <td class="flex items-center gap-2 ">
                      <VoteButton item={item} onUpdate={onUpdate} type="like" />
                      <span class="basis-10 text-center text-lg">
                        {item.likes}
                      </span>
                      <VoteButton
                        item={item}
                        onUpdate={onUpdate}
                        type="dislike"
                      />
                    </td>
                    <td class="text-center">{item.comments.length}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
