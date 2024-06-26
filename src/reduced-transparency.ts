/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency
 */
export default function isTransparencyReduced(): boolean | "no" {
    if (doesMatch('reduce')) {
      return true
    }
    if (doesMatch('no-preference')) {
      return false
    }
    return "no"
  }
  
  function doesMatch(value: string) {
    return matchMedia(`(prefers-reduced-transparency: ${value})`).matches
  }
