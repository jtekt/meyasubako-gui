import { For } from "solid-js"
import { A } from "@solidjs/router"
import { VsHome } from "solid-icons/vs"
import { FaRegularComment } from "solid-icons/fa"

export default ({ item }: any) => {
  const getParentsRecursively = (item: any) => {
    let out: any[] = []
    if (item.parent)
      out = [...out, item.parent, ...getParentsRecursively(item.parent)]

    return out
  }

  return (
    <div class="breadcrumbs my-2 text-lg">
      <ul>
        <li>
          <A href={`/`} class="btn">
            <VsHome size={20} />
            <span class="ml-2">アイテム一覧</span>
          </A>
        </li>
        <For each={getParentsRecursively(item())}>
          {(parent: any) => (
            <li>
              <A href={`/items/${parent.id}`} class="btn">
                <FaRegularComment size={20} />
                <span class="ml-2">{parent.id}</span>
              </A>
            </li>
          )}
        </For>
        <li>
          <span class="btn btn-disabled">
            <FaRegularComment size={20} />
            <span class="ml-2">{item().id}</span>
          </span>
        </li>
      </ul>
    </div>
  )
}
