export default function getHardwareConcurrency(): number | undefined {
  return navigator.hardwareConcurrency;
}
