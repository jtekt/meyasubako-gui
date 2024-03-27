import { authData } from "./store"

export const formatDate = (raw: string) =>
  new Date(raw).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

export const httpRequest = async (
  url: string | URL,
  userOptions?: RequestInit | undefined
) => {
  const headers = new Headers({ ...userOptions?.headers })
  if (authData.jwt) headers.append("authorization", `Bearer ${authData.jwt}`)
  const options = { ...userOptions, headers }
  const response = await fetch(url, options)
  return await response.json()
}
