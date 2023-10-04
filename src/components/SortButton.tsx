import { A, useSearchParams } from "@solidjs/router"
import {
  FaRegularCommentDots,
  FaRegularThumbsUp,
  FaRegularCalendar,
} from "solid-icons/fa"

export default ({ sort, text }: any) => {
  const [searchParams, setSearchParams] = useSearchParams()

  function sortBy() {
    setSearchParams({ ...searchParams, sort })
  }

  function buttonClass() {
    if (searchParams.sort === sort) return `btn btn-primary`
    else return `btn btn-ghost`
  }

  return (
    <button class={buttonClass()} onClick={() => sortBy()}>
      {text}
    </button>
  )
}
