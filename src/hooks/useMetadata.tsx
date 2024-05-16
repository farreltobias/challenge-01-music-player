import type { TagType } from 'jsmediatags/types'
import { useState, useEffect } from 'react'

import { bufferToBase64 } from '../utils/bufferToBase64'
import { MusicMetadata, defaultMetadata } from '../utils/defaultMetadata'

type Props = {
  source: File | null
  ref: React.RefObject<HTMLAudioElement>
}

export const useMetadata = ({ source, ref }: Props) => {
  const [metadata, setMetadata] = useState<MusicMetadata>(defaultMetadata)

  useEffect(() => {
    const { Reader } = window.jsmediatags

    const tagList = async () => {
      if (!source) {
        setMetadata(defaultMetadata)
        return
      }

      try {
        const data = await new Promise<TagType>((res, rej) => {
          new Reader(source).read({
            onSuccess: (data) => {
              res(data)
            },
            onError: (error) => {
              rej(error)
            },
          })
        })

        const { data: pictureData, format } = data.tags.picture || {}
        const { title, artist } = data.tags

        const pictureAsBuffer = new Uint8Array(pictureData || [])
        const pictureAsBase64 = await bufferToBase64(pictureAsBuffer)

        const picture =
          pictureData && format
            ? `data:${format};base64,${pictureAsBase64}`
            : defaultMetadata.picture

        setMetadata({
          title: title || defaultMetadata.title,
          artist: artist || defaultMetadata.artist,
          picture,
        })
      } catch (error) {
        console.error(error)
      }
    }

    ref.current?.addEventListener('loadeddata', tagList)
  }, [source, ref])

  return {
    metadata,
  }
}
