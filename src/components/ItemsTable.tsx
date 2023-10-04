import { For } from "solid-js"
import { formatDate } from "../utils"
import { A } from "@solidjs/router"
import VoteButton from "./VoteButton"
import SortButtons from "./SortButtons"
import SearchBox from "./SearchBox"
import { FaRegularComment } from "solid-icons/fa"

export default ({ items, onUpdate, title = "アイテム" }: any) => {
  return (
    <div class="card bg-base-100 shadow-xl my-4">
      <div class="card-body">
        <h2 class="card-title">
          {title} ({items().length}件)
        </h2>
        <div>
          <SearchBox />
        </div>
        <div class="">
          {/* TODO: infinite scroll */}
          <table class="table">
            <thead>
              <tr>
                <th>
                  日付
                  <SortButtons sort="time" />
                </th>
                <th>内容</th>
                <th>
                  いいね
                  <SortButtons sort="likes" />
                </th>
                <th>コメント</th>
              </tr>
            </thead>
            <tbody>
              <For each={items()}>
                {(item: any) => (
                  <tr>
                    <td>{formatDate(item.time)}</td>
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
                    {/* TODO: consider a button linking to item */}
                    <td class="text-center">
                      <A
                        href={`/items/${item.id}`}
                        class="btn flex flex-nowrap"
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
        </div>
      </div>
    </div>
  )
}
