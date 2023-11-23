import { Lunar } from "./lunar.js";

class Calendar {
  constructor({ year, month } = {}) {
    this.year = year;
    this.month = month;

    this.calendarList = []
    this.weeks = {}

    const currentMonth = this.getCurrentMonth()

    this.patch(currentMonth)
    this._getWeek()
  }

  getCurrentMonth() {
    const calendar = new Lunar()
    calendar.yueLiCalc(this.year, this.month)
    return calendar
  }

  // 补上、下月剩余
  patch(currentMonth) {
    // 以周日为月历表的开始  7 - (7 - w0) 注: 周日w0=0
    const currentMonthFristDayWeek = currentMonth.w0; // 本月第一天周几

    const patchLastMonthDays = 7 - (7 - currentMonthFristDayWeek);

    // 补上个月剩余天数
    if (patchLastMonthDays !== 0) {
      const lastMonthCalendar = this._getLastMonth()
      const lastMonthCalendarLenght = lastMonthCalendar.length
      const startIndex = lastMonthCalendarLenght - patchLastMonthDays
      const sliceList = lastMonthCalendar.slice(startIndex)

      this.calendarList.push(...sliceList)
    }

    this.calendarList.push(...currentMonth.lun)

    // 补下个月剩余天数 补全 7*5 或 7*6
    const nextMonthCalendar = this._getNextMonth()
    const surplus =
      this.calendarList.length > 35
        ? 42 - this.calendarList.length
        : 35 - this.calendarList.length
    const sliceList = nextMonthCalendar.slice(0, surplus)
    this.calendarList.push(...sliceList)
  }

  /**
   * 获取上月
   */
  _getLastMonth() {
    const calendar = new Lunar();
    let year = this.year
    let month = this.month
    if (this.month === 1) {
      year -= 1
      month = 12
    } else {
      month -= 1
    }
    calendar.yueLiCalc(year, month);
    const calendarInfo = JSON.parse(JSON.stringify(calendar));

    return calendarInfo.lun
  }

  /**
   * 获取下月
   */
  _getNextMonth() {
    const calendar = new Lunar();
    let year = this.year
    let month = this.month
    if (this.month === 12) {
      year += 1
      month = 1
    } else {
      month += 1
    }
    calendar.yueLiCalc(year, month);
    const calendarInfo = JSON.parse(JSON.stringify(calendar));

    return calendarInfo.lun
  }

  /**
   * 获取每周数据
   */
  _getWeek() {
    let weeks = {};
    for (let i = 0; i < this.calendarList.length; i++) {
      if (i % 7 === 0) {
        weeks[parseInt(i / 7)] = new Array(7);
      }
      weeks[parseInt(i / 7)][i % 7] = this.calendarList[i];
    }
    this.weeks = weeks;
  }
}

export default Calendar