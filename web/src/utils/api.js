export async function apiGet(url) {
  const res = await fetch(url)
  return res.json()
}

export async function apiPost(url, data) {
  const body = new URLSearchParams(data)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  })
  return res.json()
}

export async function apiPostRaw(url, data) {
  const body = new URLSearchParams(data)
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  })
}
