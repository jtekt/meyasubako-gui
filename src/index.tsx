/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route, Routes } from "@solidjs/router"
import { votes, setVotes } from "./votesStore"

import "./index.css"
import Items from "./Items"
import Item from "./Item"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  )
}

const votesString = localStorage.getItem("votes") || "[]"
setVotes(JSON.parse(votesString))

render(
  () => (
    <>
      <header class="navbar bg-black text-white text-2xl">目安箱</header>
      <main class="max-w-5xl mx-auto">
        <Router>
          <Routes>
            <Route path="/" component={Items} />
            <Route path="/items/:id" component={Item} />
          </Routes>
        </Router>
      </main>
    </>
  ),
  root!
)
