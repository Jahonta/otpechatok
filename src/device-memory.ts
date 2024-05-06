export default function getDeviceMemory(): number | undefined {
    // @ts-ignore
    return navigator.deviceMemory;
  }
