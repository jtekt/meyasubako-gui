import { createSignal, onMount, Show } from "solid-js"
import { FaRegularThumbsUp, FaRegularThumbsDown } from "solid-icons/fa"
import VoteButton from "./VoteButton"

export default ({ item, onUpdate }: any) => {
  return (
    <div class="flex items-center gap-2">
      <VoteButton item={item} type="like" onUpdate={onUpdate} />
      <span>{item.likes}</span>
      <VoteButton item={item} type="dislike" onUpdate={onUpdate} />
    </div>
  )
}
