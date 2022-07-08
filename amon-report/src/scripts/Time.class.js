import { Maths, Strings, Type } from "./";

const { zeroPad } = Strings;

/**
 * Time class : extends Date object to simplify date manipulation
 */
class Time extends Date {

  static months = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };
  static weekDays = { Sun: "Sunday", Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday" };
  static calendarWeeks = 6;

  /**
   * Class constructor
   * @param {Object} dateObj : object containing 
   */
  constructor(date) {

    const newDate = Time.#construct(date);

    // Converts the given string into date infos and pass them to parent constructor
    const { year, month, day, hour, min, sec } = newDate;
    super(year, month - 1, day, hour, min, sec);
  }

  /**
   * Returns real month of the year number (default Date first month is 0: January)
   * @returns {Number} : month number
   */
  getRealMonth = () => Time.getRealMonth(this);

  /**
   * Gets the current time full month
   * @returns {String} : full month
   */
  getFullMonth = () => Time.getFullMonth(this.getMonth());

  /**
   * Gets the current time short month
   * @returns {String} : short month
   */
  getShortMonth = () => Time.getShortMonth(this.getMonth());

  /**
   * Gets the current time full month
   * @returns {String} : full month
   */
  getFullDay = () => Time.getFullDay(this.getDay());

  /**
   * Gets the current time short month
   * @returns {String} : short month
   */
  getShortDay = () => Time.getShortDay(this.getDay());

  /**
   * Returns object containing time infos
   * @returns {Object} : time object
   */
  getDateObj = () => Time.getDateObj(this);

  /**
   * Returns a string based on time infos
   * @returns {String} : time string
   */
  toDateString = (format = "YYYY-MM-DD") => Time.toDateString(this, format);

  /**
   * Gets ISO formated date string
   * @returns {String} : ISO date string
   */
  getISOString = () => this.toDateString().split(' ')[0];

  /**
   * Checks if year of current time is a lap year
   * @returns {Boolean} : whether the given year is a lap year or not
   */
  isLapYear = () => Time.isLapYear(this.getFullYear());

  /** */
  getMonthFirstDay = () => Time.getMonthFirstDay(this.getRealMonth(), this.getFullYear());

  /**
   * Gets the month and year before the current date
   * @returns {Object} : previous month and year couple
   */
  getPreviousMonth = () => Time.getDatePreviousMonth(this);

  /**
   * Gets the month and year after the current date
   * @returns {Object} : next month and year couple
   */
  getNextMonth = () => Time.getDateNextMonth(this);

  /**
   * Returns day of week index shifted, so that monday is 0 (first day of the week)
   * @returns {Number} : day index
   */
  getMonDay = () => {
    const baseDay = this.getDay();
    return baseDay === 0 ? 6 : baseDay - 1;
  }

  /**
   * Checks if two dates are the same date, month and year
   * @param   {Date|Time} date : date
   * @returns {Boolean}        : whether the two dates are same date, month and year or not
   */
  isSameDay = date => Time.isSameDay(this, date);

  /**
   * Checks if current time is before given date
   * @param   {Date|Time} date : first date
   * @returns {Boolean}        : whether current date is before second date or not
   */
  isBefore = date => Time.isBefore(this, date);

  /**
   * Checks if current time is after given date
   * @param   {Date|Time} date : first date
   * @returns {Boolean}        : whether current date is after second date or not
   */
  isAfter  = date => Time.isAfter(this, date);

  /**
   * Checks if current time is between date1 and date2
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @returns {Boolean}         : whether current date is between the two given dates or not
   */
  isBetween = (date1, date2) => Time.isBetween(this, date1, date2);

  /**
   * Returns calendar dates based on given current time
   * @returns {Time[]} : calendar dates
   */
  getCalendar = () => Time.getCalendar(this.getRealMonth(), this.getFullYear());

  /**
   * Gets the full month name based on the given month number
   * @param   {Number} month : month number
   * @returns {String}       : full month
   */
  static getFullMonth = month => {
    Type.checkTypes([month], [Type.number]);
    return Object.values(Time.months)[Maths.limit(month, [0, 11])];
  }

  /**
   * Gets the short month name based on the given month number
   * @param   {Number} month : month number
   * @returns {String}       : short month
   */
  static getShortMonth = month => {
    Type.checkTypes([month], [Type.number]);
    return Object.keys(Time.months)[Maths.limit(month, [0, 11])];
  }
 
  /**
   * Gets the full day name based on the given day number
   * @param   {Number} day : day number
   * @returns {String}     : full day name
   */
  static getFullDay = day => {
    Type.checkTypes([day], [Type.number]);
    return Object.values(Time.weekDays)[Maths.limit(day, [0, 6])];
  }
 
  /**
   * Gets the full day name based on the given day number
   * @param   {Number} day : day number
   * @returns {String}     : short day name
   */
  static getShortDay = day => {
    Type.checkTypes([day], [Type.number]);
    return Object.keys(Time.weekDays)[Maths.limit(day, [0, 6])];
  }

  /**
   * Returns real month of the year number (default Date first month is 0: January)
   * @param   {Date} date : date object
   * @returns {Number}    : real month number
   */
  static getRealMonth = date => date.getMonth() + 1;

  /**
   * Returns week object with Monday as first day;
   * @returns {Object} : reordered week days
   */
  static getRealWeek = () => {
    const { Sun, ...otherDays } = Time.weekDays;
    return { ...otherDays, Sun };
  }

  /**
   * Gets the month and year before the given month and year
   * @param   {Number} month : month number
   * @param   {Number} year  : year
   * @returns {Object}       : previous month and year couple
   */
  static getPreviousMonth = (month, year) =>
    ({ month: month > 1 ? month - 1 : 12, year: month > 1 ? year : year - 1 });

  /**
   * Gets the month and year after the given month and year
   * @param   {Number} month : month number
   * @param   {Number} year  : year
   * @returns {Object}       : next month and year couple
   */
  static getNextMonth = (month, year) =>
    ({ month: month < 12 ? month + 1 : 1, year: month < 12 ? year : year + 1 });

  /**
   * Gets the month and year before the given date
   * @param   {Date}   date : date object
   * @returns {Object}      : previous month and year couple
   */
  static getDatePreviousMonth = date => Time.getPreviousMonth(Time.getRealMonth(date), date.getFullYear());

  /**
   * Gets the month and year after the given date
   * @param   {Date}   date : date object
   * @returns {Object}      : next month and year couple
   */
  static getDateNextMonth = date => Time.getNextMonth(Time.getRealMonth(date), date.getFullYear());

  /**
   * Returns string based on given date
   * @param   {Date}   date : date to use
   * @returns {String}      : date string 
   */
  static toDateString = (date, format = "YYYY-MM-DD") => {
    Type.checkTypes([date, format], [Type.date, Type.string]);
    const year = date.getFullYear(), month = zeroPad(date.getMonth() + 1, 2), day = zeroPad(date.getDate(), 2),
          hour = zeroPad(date.getHours(), 2), min = zeroPad(date.getMinutes(), 2), sec = zeroPad(date.getSeconds(), 2);
    let res;
    switch (format) {
      case "YYYY":
        res = year;
        break;
      case "YYYY-MM":
        res = year + "-" + month;
        break;
      case "YYYY-MM-DD hh:mm":
        res = year + "-" + month + "-" + day + " " + hour + ":" + min;
        break;
      case "YYYY-MM-DD hh:mm:ss":
          res = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
          break;
      default:
        res = year + "-" + month + "-" + day;
        break;
    }
    return res;
  }

  /**
   * Returns object containing time infos
   * @returns {Object} : time object
   */
  static getDateObj = date =>
    ({ year: date.getFullYear(), month: Time.getRealMonth(date), day: date.getDate(), hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds() });

  /**
   * Checks if the given year is a lap year
   * @param   {Number}  year : year to check
   * @returns {Boolean}      : whether the given year is a lap year or not
   */
  static isLapYear = year => year % 4 === 0;

  /**
   * Gets given month number of days based on given year and month number
   * @param   {Number} month : month number
   * @param   {Number} year  : year
   * @returns {Number}       : number of days
   */
  static getMonthDays = (month, year) => {
    if (month < 1 || month > 12) throw new Error(`Invalid month number ${month} provided, expected a number between 1 and 12 !`);
    return month === 2
      ? Time.isLapYear(year) ? 29 : 28 
      : [4, 6, 9, 11].includes(month) ? 30 : 31;
  }

  /**
   * Checks if two dates are the same month and year
   * @param   {Date|Time} date1 : date 1
   * @param   {Date|Time} date2 : date 2
   * @returns {Boolean}         : whether the two dates are same month and year or not
   */
  static isSameMonth = (date1, date2) => {
    if (!date1 || !date2) return false;
    Type.checkTypes([date1, date2], [Type.date]);
    return (date1.getFullYear() === date2.getFullYear()) && (Time.getRealMonth(date1) === Time.getRealMonth(date2));
  }

  /**
   * Checks if given date1 is before date2
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @returns {Boolean}         : whether first date is before second date or not
   */
  static isBefore = (date1, date2) => {
    Type.checkTypes([date1, date2], [Type.date]);
    return date1 < date2;
  }

  /**
   * Checks if given date1 is after date2
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @returns {Boolean}         : whether first date is after second date or not
   */
  static isAfter = (date1, date2) => {
    Type.checkTypes([date1, date2], [Type.date]);
    return date1 > date2;
  }

  /**
   * Checks if given date1 is between date2 and date3
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @param   {Date|Time} date3 : third date
   * @returns {Boolean}         : whether first date is between second and third date or not
   */
  static isBetween = (date1, date2, date3) => {
    if(!date1 || !date2 || !date3) return false;
    Type.checkTypes([date1, date2, date3], [Type.date]);
    return date1 > date2 && date1 < date3;
  }

  /**
   * Checks if two dates are the same date, month and year
   * @param   {Date|Time} date1 : date 1
   * @param   {Date|Time} date2 : date 2
   * @returns {Boolean}         : whether the two dates are same date, month and year or not
   */
  static isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (Time.isSameMonth(date1, date2) && (date1.getDate() === date2.getDate()))
  }

  /**
   * Returns calendar dates based on given month and year
   * @param   {Number} month : month number
   * @param   {Number} year  : year
   * @returns {Time[]}       : calendar dates
   */
  static getCalendar = (month, year) => {
    const monthDays = Time.getMonthDays(month, year);
    const firstDay  = Time.getMonthFirstDay(month, year);

    const daysFromPrevMonth = firstDay,
          daysFromNextMonth = Time.calendarWeeks * 7 - (daysFromPrevMonth + monthDays);

    const { month: prevMonth, year: prevMonthYear } = Time.getPreviousMonth(month, year),
          { month: nextMonth, year: nextMonthYear } = Time.getNextMonth(month, year);

    const prevMonthDays = Time.getMonthDays(prevMonth, prevMonthYear);

    // Build dates from previous, current and next month
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, i) => 
      ({ year: prevMonthYear, month: prevMonth, day: i + 1 + (prevMonthDays - daysFromPrevMonth) }));

    const thisMonthDates = [...new Array(monthDays)].map((n, i) => ({ year, month, day: i + 1 }));

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, i) => ({ year: nextMonthYear, month: nextMonth, day: i + 1 }));

    return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];
  }

  /**
   * Gets day of week number of the first day of the given month
   * @param   {Number} month : month number
   * @param   {Number} year  : year
   * @returns {Number}       : first day of month
   */
  static getMonthFirstDay = (month, year) => (new Time(`${year}-${zeroPad(month, 2)}-01`).getMonDay());

  /**
   * Converts date string into object containing time infos
   * @param   {String} str : time string
   * @returns {Object}     : time infos
   */
  static formatDateString = str => {
    const filter  = /[/\D/g]/gi;
    let filterStr = str.replace(filter, '');

    if (filterStr.length < 4) throw new Error(`${str} is not a valid time string !`);
    const year = parseInt(filterStr.slice(0,   4), 10);
    const month = filterStr.length > 4
                ? filterStr.length === 5 ? parseInt(filterStr.slice(4, 5), 10) : parseInt(filterStr.slice(4, 6), 10)
                : 1;
    if (month < 1 || month > 13) throw new Error(`Invalid month, expected a value between 1 and 12!`);
    const day = filterStr.length > 6
              ? filterStr.length === 7 ? parseInt(filterStr.slice(6, 7), 10) : parseInt(filterStr.slice(6, 8), 10)
              : 1;
    const maxDays = Time.getMonthDays(month, year);
    if (day < 1 || day > maxDays) throw new Error(`Invalid day, expected a value between 1 and ${maxDays}!`);
    const hour = filterStr.length > 8
               ? filterStr.length === 9 ? parseInt(filterStr.slice(8, 9), 10) : parseInt(filterStr.slice(8, 10), 10)
               : 1;
    if (hour < 0 || hour > 23) throw new Error(`Invalid hour, expected a value between 0 and 23!`);
    const min = filterStr.length > 10
              ? filterStr.length === 11 ? parseInt(filterStr.slice(10, 11), 10) : parseInt(filterStr.slice(10, 12), 10)
              : 0;
    if (min < 0 || min > 59) throw new Error(`Invalid minutes, expected a value between 0 and 59!`); 
    const sec = filterStr.length > 12
              ? filterStr.length === 13 ? parseInt(filterStr.slice(12, 13), 10) : parseInt(filterStr.slice(12, 14), 10)
              : 0;
    if (sec < 0 || sec > 59) throw new Error(`Invalid seconds, expected a value between 0 and 59!`); 

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }

  /**
   * Returns min and max time of a given array of times
   * @param   {Time[]} dates : array of time
   * @returns {Time[]}       : min, max time
   */
  static getPeriod = dates => {
    const min = Math.min.apply(null, dates),
          max = Math.max.apply(null, dates);

    return [new Time(new Date(min)), new Time(new Date(max))];
  }

  /**
   * Handles different argument type passed to constructor
   * @param {*} date 
   * @returns 
   */
   static #construct = date => {
    const argType = Type.getRealType(date);
    let res;
    switch (argType) {
      case Type.string:
        res = Time.#str2dateObj(Time.formatDateString(date));
        break;
      case Type.date:
        res = Time.getDateObj(date);
        break;
      case Type.object:
        const { year, month = 1, day = 1, hour = 1, min = 0, sec = 0 } = date;
        res = year ? { year, month, day, hour, min, sec } : Time.#today();
        break;
      default:
        res = Time.#today();
        break;
    }
    return res;
  }

  /**
   * Returns today date string
   * @returns {String} : today string
   */
  static #today = () => Time.getDateObj(new Date());

  /**
   * Converts a formated dateString to a dateObj
   * @param {*} dateStr 
   * @returns 
   */
   static #str2dateObj = dateStr => {
    const [ ymd, hms ] = dateStr.split(' ');
    const ymdArr = ymd.split('-'),
          hmsArr = hms.split(':');
    const timeArr = [...ymdArr, ...hmsArr].map(t => parseInt(t, 10));
    return { year: timeArr[0], month: timeArr[1], day: timeArr[2], hour: timeArr[3], min: timeArr[4], sec: timeArr[5] };
  }
}

export default Time;