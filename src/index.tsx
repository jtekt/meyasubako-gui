/* @refresh reload */
import { Show, render } from "solid-js/web"
import { Router, Route, Routes, Navigate, A } from "@solidjs/router"
import { setVotes } from "./store"
import ThemeButton from "./components/ThemeButton"
import { IoLogOut } from "solid-icons/io"

import "./index.css"
import Items from "./Items"
import Item from "./Item"
import Login from "./login"
import { authData } from "./store"

const { VITE_LOGIN_URL } = import.meta.env

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

loadVotesFromLocalStorage()

render(
  () => (
    <>
      <header class="navbar bg-black text-white text-xl flex items-center gap-2">
        <img
          class="h-8 border-r-white border-r"
          src="/JTEKT_negative.jpg"
          alt="JTEKT logo"
        />
        <span>目安箱</span>
        <div class="ml-auto">
          <Show when={VITE_LOGIN_URL && authData.jwt}>
            <a href="/logout" class="btn btn-ghost btn-circle">
              <IoLogOut size={24} />
            </a>
          </Show>

          <ThemeButton />
        </div>
      </header>
      <main class="max-w-7xl mx-auto min-h-screen">
        <Router>
          <Routes>
            <Show when={!VITE_LOGIN_URL || authData.jwt}>
              <Route path={["/", "/items"]} component={Items} />
              <Route path="/items/:id" component={Item} />
            </Show>
            <Show when={VITE_LOGIN_URL}>
              <Show when={!authData.jwt}>
                <Route path="/*" component={() => <Navigate href="/login" />} />
              </Show>
              <Route path={["/login", "/logout"]} component={Login} />
            </Show>
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
