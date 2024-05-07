/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export default function isMotionReduced(): boolean | "no" {
    if (doesMatch('reduce')) {
      return true
    }
    if (doesMatch('no-preference')) {
      return false
    }
    return "no"
  }
  
  function doesMatch(value: string) {
    return matchMedia(`(prefers-reduced-motion: ${value})`).matches
  }
