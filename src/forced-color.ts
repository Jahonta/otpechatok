export default function areColorsForced(): boolean | undefined {
    if (doesMatch('active')) {
      return true
    }
    if (doesMatch('none')) {
      return false
    }
    return undefined
  }
  
  function doesMatch(value: string) {
    return matchMedia(`(forced-colors: ${value})`).matches
  }
