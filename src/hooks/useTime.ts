import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear)

// 获取当月第一天
export const getFirstDayOfMonth = () => {
  const string = dayjs().startOf('month').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  return string2
}

// 获取当月最后一天
export const getLastDayOfMonth = () => {
  const string = dayjs().endOf('month').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  return string2
}

// 获取当年第一天
export const getFirstDayOfYear = () => {
  const string = dayjs().startOf('year').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  return string2
}

// 获取当年最后一天
export const getLastDayOfYear = () => {
  const string = dayjs().endOf('year').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  return string2
}

// 获取当周第一天
export const getFirstDayOfWeek = () => {
  const string = dayjs().startOf('week').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  const string3 = dayjs(string2).add(1, 'day').toString()
  const string4 = dayjs(string3).format('YYYY-MM-DD')
  return string4
}

// 获取当周最后一天
export const getLastDayOfWeek = () => {
  const string = dayjs().endOf('week').toISOString()
  const string2 = dayjs(string).format('YYYY-MM-DD')
  const string3 = dayjs(string2).add(1, 'day').toString()
  const string4 = dayjs(string3).format('YYYY-MM-DD')
  return string4
}

// 获取当前季度第一天
export const getFirstDayOfSeason = () => {
  const season1 = dayjs().startOf('quarter').toISOString()
  const season2 = dayjs(season1).format('YYYY-MM-DD')
  return season2
}

// 获取当前季度最后一天
export const getLastDayOfSeason = () => {
  const season1 = dayjs().endOf('quarter').toISOString()
  const season2 = dayjs(season1).format('YYYY-MM-DD')
  return season2
}

// 美化时间
export const beautifyTime = (DateString: string) => {
  let dateObj = typeof DateString === 'object' ? DateString : new Date(DateString)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''
  if (space < 60 * 1000) {
    str = '刚刚'
  } else if (space < 3600 * 1000) {
    str = `${Math.floor(space / 60000)} 分钟前`
  } else if (space < 3600 * 1000 * 24) {
    str = `${Math.floor(space / (3600 * 1000))} 小时前`
  } else {
    str = `${Math.floor(space / (3600 * 1000 * 24))} 天前`
  }
  return str
}