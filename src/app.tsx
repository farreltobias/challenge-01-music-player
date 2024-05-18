import styles from './app.module.css'
import { Player } from './components/Player'
import { createRef, useEffect, useState } from 'react'
import { useMetadata } from './hooks/useMetadata'

import musicFile from './assets/Down South - Jeremy Loops.mp3'
import { DownloadSimple, MusicNote } from '@phosphor-icons/react'

export const App: React.FC = () => {
  const [source, setSource] = useState<File | null>(null)
  const ref = createRef<HTMLAudioElement>()

  const { metadata } = useMetadata({ source, ref })

  useEffect(() => {
    if (!ref.current || !source) return

    ref.current.src = URL.createObjectURL(source)
    ref.current.load()
  }, [source]) // eslint-disable-line react-hooks/exhaustive-deps

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setSource(file)
  }

  return (
    <main className={styles.wrapper}>
      <label className={styles.file}>
        <MusicNote size={32} weight="regular" />
        Upload your music
        <input type="file" accept=".mp3,audio/*" onChange={onFileChange} />
      </label>

      <a
        className={styles.download}
        href={musicFile}
        download
        title="Download sample"
      >
        <DownloadSimple />
        <div>
          <MusicNote size={32} weight="regular" />
          <div>
            <strong>Down South</strong>
            <span>Jeremy Loops</span>
          </div>
        </div>
      </a>

      <Player audioRef={ref} metadata={metadata} />
      <Player audioRef={ref} metadata={metadata} variant="small" />
      <Player audioRef={ref} metadata={metadata} variant="small" noTimer />

      <audio ref={ref} loop autoPlay />
    </main>
  )
}
