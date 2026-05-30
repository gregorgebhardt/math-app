import { describe, it, expect } from 'vitest'
import { minuteMatches, clockIsCorrect } from '../src/utils/clock.js'

describe('minuteMatches', () => {
  it('matches two-digit exact',          () => expect(minuteMatches('30', 30)).toBe(true))
  it('matches single digit via padStart', () => expect(minuteMatches('5', 5)).toBe(true))
  it('matches "0" for zero',             () => expect(minuteMatches('0', 0)).toBe(true))
  it('matches "00" for zero',            () => expect(minuteMatches('00', 0)).toBe(true))
  it('rejects empty string',             () => expect(minuteMatches('', 0)).toBe(false))
  it('rejects null',                     () => expect(minuteMatches(null, 0)).toBe(false))
  it('rejects wrong value',              () => expect(minuteMatches('15', 30)).toBe(false))
})

describe('clockIsCorrect – Leicht (12h hour only, no minute)', () => {
  const p    = { hour: 3, minute: 0 }
  const base = { problem: p, showMinute: false, twentyFourHour: false, amPmHint: false }
  it('correct',                  () => expect(clockIsCorrect({ ...base, userHour: '3'  })).toBe(true))
  it('leading zero accepted',    () => expect(clockIsCorrect({ ...base, userHour: '03' })).toBe(true))
  it('wrong hour',               () => expect(clockIsCorrect({ ...base, userHour: '4'  })).toBe(false))
  it('empty hour',               () => expect(clockIsCorrect({ ...base, userHour: ''   })).toBe(false))
})

describe('clockIsCorrect – Einfach (24h two-field, no minute)', () => {
  const p    = { hour: 2, minute: 0, hour24: 14 }
  const base = { problem: p, showMinute: false, twentyFourHour: true, amPmHint: false }
  it('correct 12h + 24h',            () => expect(clockIsCorrect({ ...base, userHour: '2',  userHour24: '14' })).toBe(true))
  it('leading zero on 12h field',    () => expect(clockIsCorrect({ ...base, userHour: '02', userHour24: '14' })).toBe(true))
  it('entered 12h in both (wrong)',  () => expect(clockIsCorrect({ ...base, userHour: '2',  userHour24: '2'  })).toBe(false))
  it('missing 24h field',            () => expect(clockIsCorrect({ ...base, userHour: '2',  userHour24: ''   })).toBe(false))
})

describe('clockIsCorrect – Mittel/Schwer/Profi (amPmHint, enter 24h)', () => {
  describe('Nachmittag (afternoon)', () => {
    const p    = { hour: 1, minute: 45, isAfternoon: true, hour24: 13 }
    const base = { problem: p, showMinute: true, twentyFourHour: false, amPmHint: true }
    it('correct 24h + minute',               () => expect(clockIsCorrect({ ...base, userHour: '13', userMinute: '45' })).toBe(true))
    it('entered 12h instead of 24h (wrong)', () => expect(clockIsCorrect({ ...base, userHour: '1',  userMinute: '45' })).toBe(false))
    it('wrong minute',                       () => expect(clockIsCorrect({ ...base, userHour: '13', userMinute: '44' })).toBe(false))
    it('single-digit minute accepted', () => {
      const p5 = { ...p, minute: 5, hour24: 13 }
      expect(clockIsCorrect({ ...base, problem: p5, userHour: '13', userMinute: '5' })).toBe(true)
    })
    it('full-hour: "00" minute', () => {
      const p0 = { hour: 3, minute: 0, isAfternoon: true, hour24: 15 }
      expect(clockIsCorrect({ ...base, problem: p0, userHour: '15', userMinute: '00' })).toBe(true)
    })
    it('full-hour: "0" minute', () => {
      const p0 = { hour: 3, minute: 0, isAfternoon: true, hour24: 15 }
      expect(clockIsCorrect({ ...base, problem: p0, userHour: '15', userMinute: '0' })).toBe(true)
    })
  })
  describe('Vormittag (morning)', () => {
    const p    = { hour: 3, minute: 30, isAfternoon: false, hour24: 3 }
    const base = { problem: p, showMinute: true, twentyFourHour: false, amPmHint: true }
    it('correct (24h = 12h in morning)',          () => expect(clockIsCorrect({ ...base, userHour: '3',  userMinute: '30' })).toBe(true))
    it('wrongly added +12 for morning',           () => expect(clockIsCorrect({ ...base, userHour: '15', userMinute: '30' })).toBe(false))
  })
})
