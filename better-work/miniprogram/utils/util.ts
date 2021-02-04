export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const getLocalTime = (days:any = 0, date:any = new Date()) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  const m = d.getMonth() + 1
  return d.getFullYear() + '-' + m + '-' + d.getDate()
}
