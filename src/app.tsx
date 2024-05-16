import styles from './app.module.css'
import { Player } from './components/Player'

export const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <Player />
      <Player variant="small" />
      <Player variant="small" noTimer />
    </main>
  )
}
