export default function getCpuClass(): string | undefined {
    // @ts-ignore
    return navigator.cpuClass || 'no';
  }
