import { useSearchParams } from "@solidjs/router"
import { FaSolidArrowDown, FaSolidArrowUp } from "solid-icons/fa"

export default ({ sort, text }: any) => {
  const [searchParams, setSearchParams] = useSearchParams()

  function applySort(order: string) {
    setSearchParams({ ...searchParams, sort, order })
  }

  function buttonClass(order: string) {
    let out = `btn btn-xs`
    if (searchParams.sort === sort && searchParams.order === order)
      out = `${out} btn-primary`
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
