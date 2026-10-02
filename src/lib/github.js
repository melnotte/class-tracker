const CONFIG_KEY = 'class-tracker-github'
const FILE_PATH = 'public/data.json'

const DEFAULT_CONFIG = { owner: '', repo: 'class-tracker', branch: 'main', token: '' }

export function loadGithubConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    return raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : DEFAULT_CONFIG
  } catch {
    return DEFAULT_CONFIG
  }
}

export function saveGithubConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

// btoa no soporta acentos, por eso se pasa primero por UTF-8
function toBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

export async function publishToGithub({ owner, repo, branch, token }, data) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  // 1. Obtener el sha actual del archivo (GitHub lo exige para actualizar)
  let sha
  const current = await fetch(`${url}?ref=${branch}`, { headers, cache: 'no-store' })
  if (current.ok) {
    sha = (await current.json()).sha
  } else if (current.status !== 404) {
    const err = await current.json().catch(() => ({}))
    throw new Error(err.message || `Error ${current.status} al leer el archivo`)
  }

  // 2. Hacer el commit con el contenido nuevo
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Actualizar progreso (${new Date().toLocaleString('es-MX')})`,
      content: toBase64(JSON.stringify(data, null, 2)),
      branch,
      sha,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status} al publicar`)
  }
}