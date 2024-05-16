import { Rewind, Play, FastForward } from '@phosphor-icons/react'

import album from '../assets/album.png'
import styles from './Player.module.css'

type Props = {
  variant?: 'default' | 'small'
  noTimer?: boolean
}

export const Player: React.FC<Props> = ({
  variant = 'default',
  noTimer = false,
}) => {
  return (
    <section className={`${styles.player} ${styles[variant]}`}>
      <header>
        <img src={album} alt="album-cover" />
        <div>
          <h1>Acorda Devinho</h1>
          <p>Banda Rocketseat</p>
        </div>
      </header>
      <div className={styles.controls}>
        <button>
          <Rewind />
        </button>
        <button>
          <Play />
        </button>
        <button>
          <FastForward />
        </button>
      </div>
      <footer className={noTimer ? styles.timerHidden : styles.timer}>
        <div className={styles.slider}>
          {/* <input type="range" /> */}
          <div />
          <div />
        </div>
        <div className={styles.times}>
          <span>03:20</span>
          <span>00:12</span>
        </div>
      </footer>
    </section>
  )
}
