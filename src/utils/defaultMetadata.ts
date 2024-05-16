import albumDefault from '../assets/album.png'

export type MusicMetadata = {
  title: string
  artist: string
  picture: string
}

export const defaultMetadata = {
  title: 'Acorda Devinho',
  artist: 'Banda Rocketseat',
  picture: albumDefault,
} as const satisfies MusicMetadata
