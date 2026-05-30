export function minuteMatches(entered, expected) {
  if (!entered) return false
  return Number(entered.padStart(2, '0')) === expected
}

// targetHour: 12h for Leicht/Einfach; 24h for Mittel+ (amPmHint)
export function clockIsCorrect({ userHour, userMinute, userHour24, problem, showMinute, twentyFourHour, amPmHint }) {
  if (!problem) return false
  const targetHour = amPmHint ? problem.hour24 : problem.hour
  const hourOk   = userHour !== '' && Number(userHour) === targetHour
  const minuteOk = !showMinute || minuteMatches(userMinute, problem.minute)
  if (!twentyFourHour) return hourOk && minuteOk
  const hour24Ok = (userHour24 ?? '') !== '' && Number(userHour24) === problem.hour24
  return hourOk && minuteOk && hour24Ok
}
