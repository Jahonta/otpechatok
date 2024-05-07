export default function getHardwareConcurrency(): number | "no" {
  return navigator.hardwareConcurrency || "no";
}
