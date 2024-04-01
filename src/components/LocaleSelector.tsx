import * as i18n from "@solid-primitives/i18n"
import { createSignal, createMemo } from "solid-js"
import { RiEditorTranslate2 } from "solid-icons/ri"
import ja from "../locales/ja.json"
import en from "../locales/en.json"
const dictionaries = { en, ja }

export type Locale = "en" | "ja"

export let t: any

export default () => {
  const [locale, setLocale] = createSignal<Locale>("ja")

  // TODO: save in localStorage

  const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))

  t = i18n.translator(dict)

  return (
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <RiEditorTranslate2 />
        <span>{locale()}</span>
      </div>
      <ul
        tabindex="0"
        class="p-2 shadow menu dropdown-content z-[1] rounded-box bg-black"
      >
        <li>
          <button
            onClick={() => setLocale("en")}
            class="btn btn-ghost btn-circle"
          >
            en
          </button>
        </li>
        <li>
          <button
            onClick={() => setLocale("ja")}
            class="btn btn-ghost btn-circle"
          >
            ja
          </button>
        </li>
      </ul>
    </div>
  )
}
