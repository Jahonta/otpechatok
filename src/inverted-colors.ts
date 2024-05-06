/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors
 */
export default function areColorsInverted(): boolean | string {
  if (doesMatch('inverted')) {
    return true
  }
  if (doesMatch('none')) {
    return false
  }
  return "no"
}

function doesMatch(value: string) {
  return matchMedia(`(inverted-colors: ${value})`).matches
}
