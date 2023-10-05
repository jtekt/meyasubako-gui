import { useSearchParams } from "@solidjs/router"
import { FaSolidArrowDown, FaSolidArrowUp } from "solid-icons/fa"

export default ({ sort }: any) => {
  const [searchParams, setSearchParams] = useSearchParams()

  function applySort(order: string) {
    setSearchParams({ ...searchParams, sort, order })
  }

  function buttonClass(newOrder: string) {
    let out = `btn btn-xs`
    const { sort: currentSort = "likes", order: currentOrder = "desc" } =
      searchParams
    if (currentSort === sort && currentOrder === newOrder)
      out = `${out} btn-outline`
    else out = `${out} btn-ghost`
    return out
  }

  return (
    <span class="mx-2">
      <button class={buttonClass("desc")} onClick={() => applySort("desc")}>
        <FaSolidArrowDown />
      </button>
      <button class={buttonClass("asc")} onClick={() => applySort("asc")}>
        <FaSolidArrowUp />
      </button>
    </span>
  )
}
