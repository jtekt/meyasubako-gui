import { createSignal } from "solid-js"
import { IoSend } from "solid-icons/io"
import { useNavigate } from "@solidjs/router"

export default ({ parent_id, type = "目安" }: any) => {
  const { VITE_MENDOKUSAI_API_URL } = import.meta.env

  const [content, setContent] = createSignal("")
  const navigate = useNavigate()

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    const url = `${VITE_MENDOKUSAI_API_URL}/items`
    const options = {
      method: "POST",
      body: JSON.stringify({ content: content(), parent_id }),
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(url, options)
    const { id } = await response.json()
    navigate(`/items/${id}`)
  }

  return (
    <div class="card bg-base-100 shadow-xl my-4">
      <div class="card-body">
        <h2 class="card-title">{type}新規作成</h2>

        <form onsubmit={handleFormSubmit} class="flex gap-2 my-2">
          <div class="form-control w-full">
            <textarea
              class="textarea textarea-bordered w-full"
              rows="1"
              placeholder={`新しい${type}}`}
              onInput={(event: any) => {
                setContent(event?.target?.value)
              }}
            ></textarea>

            <label class="label">
              <span class="label-text-alt">{type}は匿名で登録されます</span>
            </label>
          </div>
          <button class="btn btn-primary" type="submit">
            <IoSend size={24} />
          </button>
        </form>
      </div>
    </div>
  )
}
