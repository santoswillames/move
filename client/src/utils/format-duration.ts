export function formatDuration(durationStr: string) {
  const seconds = Number.parseInt(durationStr.replace('s', ''), 10)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}min`
  }
  if (minutes > 0) {
    return `${minutes}min`
  }
  return `${remainingSeconds}s`
}
