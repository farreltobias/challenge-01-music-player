export const formatTime = (time: number) => {
  if (isNaN(time)) return '00:00'

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${seconds}`
}