/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route, Routes } from "@solidjs/router"
import { setVotes } from "./store"
import { CgDarkMode } from "solid-icons/cg"

import "./index.css"
import Items from "./Items"
import Item from "./Item"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  )
}

function loadVotesFromLocalStorage() {
  const votesString = localStorage.getItem("votes") || "[]"
  setVotes(JSON.parse(votesString))
}

function loadThemeFromLocalSorage() {
  const html = document.querySelector("html")
  if (!html) return
  const theme = localStorage.getItem("theme")
  html.setAttribute("data-theme", theme || "light")
}

function changeTheme() {
  const html = document.querySelector("html")
  if (!html) return
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

loadVotesFromLocalStorage()
loadThemeFromLocalSorage()

render(
  () => (
    <>
      <header class="navbar bg-black text-white text-xl flex items-center gap-2">
        <img
          class="h-8 border-r-white border-r"
          src="/JTEKT_negative.jpg"
          alt="JTEKT logo"
        />
        目安箱
        <button onclick={changeTheme} class="ml-auto btn btn-ghost btn-circle">
          <CgDarkMode size={24} />
        </button>
      </header>
      <main class="max-w-7xl mx-auto min-h-screen">
        <Router>
          <Routes>
            <Route path="/" component={Items} />
            <Route path="/items/:id" component={Item} />
          </Routes>
        </Router>
      </main>
      <footer class="footer footer-center p-2 bg-neutral text-neutral-content">
        目安箱 - Maxime MOREILLON - JTEKT Corporation
      </footer>
    </>
  ),
  root!
)
