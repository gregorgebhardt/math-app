export function minuteMatches(entered, expected) {
  if (!entered) return false
  return Number(entered.padStart(2, '0')) === expected
}

// amPmHint is display-only; validation always checks the 12h clock reading (problem.hour)
export function clockIsCorrect({ userHour, userMinute, userHour24, problem, showMinute, twentyFourHour }) {
  if (!problem) return false
  const hourOk   = userHour !== '' && Number(userHour) === problem.hour
  const minuteOk = !showMinute || minuteMatches(userMinute, problem.minute)
  if (!twentyFourHour) return hourOk && minuteOk
  const hour24Ok = (userHour24 ?? '') !== '' && Number(userHour24) === problem.hour24
  return hourOk && minuteOk && hour24Ok
}
