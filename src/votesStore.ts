import { createStore } from "solid-js/store"

export const [votes, setVotes] = createStore<
  { item_id: number; type: string }[]
>([])
