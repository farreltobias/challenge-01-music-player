import { createRef, useEffect, useState } from 'react'
import { Rewind, Play, FastForward, Pause } from '@phosphor-icons/react'

import styles from './Player.module.css'
import { formatTime } from '../utils/formatTime'
import { MusicMetadata } from '../utils/defaultMetadata'

type Props = {
  metadata: MusicMetadata
  audioRef: React.RefObject<HTMLAudioElement>
  variant?: 'default' | 'small'
  noTimer?: boolean
}

export const Player: React.FC<Props> = ({
  variant = 'default',
  noTimer = false,
  metadata: { artist, picture, title },
  audioRef,
}) => {
  const DEFAULT_DURATION = 200
  const DEFAULT_REMAINING_TIME = 12

  const sliderRef = createRef<HTMLDivElement>()
  const [isPaused, setIsPaused] = useState<boolean>(
    audioRef.current?.paused || true
  )

  const duration = audioRef.current?.duration || DEFAULT_DURATION
  const [remainingTime, setRemainingTime] = useState<number>(
    DEFAULT_REMAINING_TIME
  )

  useEffect(() => {
    if (!sliderRef.current) return

    const widthPercentage = 100 - (remainingTime / duration) * 100
    sliderRef.current.style.width = `${widthPercentage}%`
  }, [remainingTime]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.addEventListener('pause', () => setIsPaused(true))
    audioRef.current.addEventListener('play', () => setIsPaused(false))

    audioRef.current.addEventListener('timeupdate', () => {
      if (!audioRef.current) return

      const { currentTime, duration } = audioRef.current
      const remainingTime = duration - currentTime

      setRemainingTime(remainingTime || DEFAULT_REMAINING_TIME)
    })
  }, [audioRef])

  const onPlayClick = () => {
    if (!audioRef.current || !audioRef.current.src) return

    if (isPaused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  const onRewindClick = () => {
    if (!audioRef.current || !audioRef.current.src) return
    audioRef.current.currentTime -= 10
  }

  const onFastForwardClick = () => {
    if (!audioRef.current || !audioRef.current.src) return
    audioRef.current.currentTime += 10
  }

  return (
    <section className={`${styles.player} ${styles[variant]}`}>
      <header>
        <img src={picture} alt={`${title} album cover`} />
        <div>
          <h1>{title}</h1>
          <p>{artist}</p>
        </div>
      </header>
      <div className={styles.controls}>
        <button onClick={onRewindClick}>
          <Rewind />
        </button>
        <button onClick={onPlayClick}>
          {!isPaused ? <Pause /> : <Play />}
        </button>
        <button onClick={onFastForwardClick}>
          <FastForward />
        </button>
      </div>
      <footer className={noTimer ? styles.timerHidden : styles.timer}>
        <div className={styles.slider}>
          {/* <input type="range" /> */}
          <div />
          <div ref={sliderRef} />
        </div>
        <div className={styles.times}>
          <span>{formatTime(duration)}</span>
          <span>{formatTime(remainingTime)}</span>
        </div>
      </footer>
    </section>
  )
}
