export default function areColorsForced(): boolean | "no" {
    if (doesMatch('active')) {
      return true
    }
    if (doesMatch('none')) {
      return false
    }
    return "no"
  }
  
  function doesMatch(value: string) {
    return matchMedia(`(forced-colors: ${value})`).matches
  }
