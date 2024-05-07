export default function getColorDepth(): number | "no" {
    return window.screen.colorDepth || "no";
  }
