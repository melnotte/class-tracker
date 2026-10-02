import { useState } from 'react'
import { UploadCloud, Loader2, CheckCircle2, AlertCircle, Undo2 } from 'lucide-react'
import { useData } from '../../context/dataContext'
import { loadGithubConfig, saveGithubConfig, publishToGithub } from '../../lib/github'
import { inputCls, labelCls, btnPrimary, btnGhost, card } from './ui'

export default function PublishTab() {
  const { data, dirty, markPublished, discardDraft } = useData()
  const [config, setConfig] = useState(loadGithubConfig)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const setField = (key, value) => {
    const next = { ...config, [key]: value }
    setConfig(next)
    saveGithubConfig(next)
  }

  const publish = async () => {
    if (!config.owner || !config.repo || !config.token) {
      setStatus({ type: 'error', message: 'Completa usuario, repositorio y token.' })
      return
    }
    setStatus({ type: 'saving', message: '' })
    try {
      await publishToGithub(config, data)
      markPublished()
      setStatus({
        type: 'ok',
        message: 'Publicado. Los estudiantes lo verán cuando el sitio termine de actualizarse (cerca de 1 minuto).',
      })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const discard = () => {
    if (window.confirm('Se pierden tus cambios sin publicar y se vuelve a la última versión publicada. ¿Continuar?')) {
      discardDraft()
    }
  }

  return (
    <div className="grid max-w-2xl gap-5">
      <div className={`${card} grid gap-4`}>
        <h2 className="text-lg font-semibold">Conexión con GitHub</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Usuario de GitHub</label>
            <input className={inputCls} value={config.owner} onChange={(e) => setField('owner', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Repositorio</label>
            <input className={inputCls} value={config.repo} onChange={(e) => setField('repo', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Rama</label>
          <input className={inputCls} value={config.branch} onChange={(e) => setField('branch', e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Token</label>
          <input
            type="password"
            className={inputCls}
            placeholder="github_pat_..."
            value={config.token}
            onChange={(e) => setField('token', e.target.value)}
          />
          <p className="mt-2 text-xs text-slate-500">
            El token se guarda solo en este navegador. Úsalo únicamente en tu computadora personal.
          </p>
        </div>
      </div>

      <div className={`${card} grid gap-4`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Publicar cambios</h2>
            <p className="text-sm text-slate-400">
              {dirty ? 'Tienes cambios sin publicar.' : 'No hay cambios pendientes.'}
            </p>
          </div>
          <div className="flex gap-2">
            {dirty && (
              <button className={btnGhost} onClick={discard}>
                <Undo2 size={16} /> Descartar
              </button>
            )}
            <button className={btnPrimary} onClick={publish} disabled={status.type === 'saving'}>
              {status.type === 'saving' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <UploadCloud size={16} />
              )}
              Publicar
            </button>
          </div>
        </div>

        {status.type === 'ok' && (
          <p className="flex items-start gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> {status.message}
          </p>
        )}
        {status.type === 'error' && (
          <p className="flex items-start gap-2 text-sm text-red-400">
            <AlertCircle size={18} className="mt-0.5 shrink-0" /> {status.message}
          </p>
        )}
      </div>
    </div>
  )
}