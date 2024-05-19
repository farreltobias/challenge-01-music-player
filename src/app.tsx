import { createRef, useEffect, useState } from 'react'
import DocumentMeta from 'react-document-meta'
import { DownloadSimple, MusicNote } from '@phosphor-icons/react'

import musicFile from './assets/Down South - Jeremy Loops.mp3'

import styles from './app.module.css'
import { Player } from './components/Player'
import { useMetadata } from './hooks/useMetadata'

export const App: React.FC = () => {
  const meta = {
    title: '🎵 React Music Player',
    description:
      "A simple music player built with React, that can play your favorite songs! Inspired by the #boraCodar's challenges by Rocketseat!",
    canonical: 'https://music-player.farrel.tech/',
    meta: {
      charset: 'utf-8',
      name: {
        keywords:
          'react,music,player,farrel,farreldev,farrel.tech,rocketseat,challenge',
      },
    },
  }

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
    <DocumentMeta {...meta}>
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
    </DocumentMeta>
  )
}
