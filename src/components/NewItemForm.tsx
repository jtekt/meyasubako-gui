import { Show, createSignal } from "solid-js"
import { IoSend } from "solid-icons/io"
import { useNavigate } from "@solidjs/router"
import { t } from "./LocaleSelector"
import axios from "axios"
export default ({ parent_id, type = "item" }: any) => {
  const { VITE_DESCRIPTION, VITE_LOGIN_URL } = import.meta.env

  const [content, setContent] = createSignal("")
  const navigate = useNavigate()

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    if (!confirm("登録しますか？")) return

    const { data } = await axios.post("/items", {
      content: content(),
      parent_id,
    })
    const { id } = data

    navigate(`/items/${id}`)
  }

  return (
    <div class="card bg-base-100 shadow-xl my-4">
      <div class="card-body">
        <h2 class="card-title">
          {t(type === "comment" ? "newComment" : "newItem")}
        </h2>

        <Show when={type === "item" && VITE_DESCRIPTION}>
          <p>{VITE_DESCRIPTION}</p>
        </Show>

        <form onsubmit={handleFormSubmit} class="flex gap-2 my-2">
          <div class="form-control w-full">
            <textarea
              class="textarea textarea-bordered w-full"
              rows="1"
              placeholder={t(type === "comment" ? "newComment" : "newItem")}
              onInput={(event: any) => {
                setContent(event?.target?.value)
              }}
            />
            <Show when={!VITE_LOGIN_URL}>
              <label class="label">
                <span class="label-text-alt">{type}は匿名で登録されます</span>
              </label>
            </Show>
          </div>
          <button class="btn btn-primary" type="submit">
            <IoSend size={24} />
          </button>
        </form>
      </div>
    </div>
  )
}
