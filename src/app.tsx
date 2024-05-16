import styles from './app.module.css'
import { Player } from './components/Player'
import { createRef, useEffect, useState } from 'react'
import { useMetadata } from './hooks/useMetadata'

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
      <Player audioRef={ref} metadata={metadata} />
      <Player audioRef={ref} metadata={metadata} variant="small" />
      <Player audioRef={ref} metadata={metadata} variant="small" noTimer />

      <input type="file" accept="audio/*" onChange={onFileChange} />
      <audio ref={ref} loop autoPlay />
    </main>
  )
}
