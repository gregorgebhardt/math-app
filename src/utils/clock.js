export function minuteMatches(entered, expected) {
  if (!entered) return false
  return Number(entered.padStart(2, '0')) === expected
}

// amPmHint: student enters the 24h value (e.g. 20 for 8pm); targetHour = problem.hour24
// otherwise: student enters the 12h clock reading; targetHour = problem.hour
export function clockIsCorrect({ userHour, userMinute, userHour24, problem, showMinute, twentyFourHour, amPmHint }) {
  if (!problem) return false
  const targetHour = amPmHint ? problem.hour24 : problem.hour
  const hourOk   = userHour !== '' && Number(userHour) === targetHour
  const minuteOk = !showMinute || minuteMatches(userMinute, problem.minute)
  if (!twentyFourHour) return hourOk && minuteOk
  const hour24Ok = (userHour24 ?? '') !== '' && Number(userHour24) === problem.hour24
  return hourOk && minuteOk && hour24Ok
}
