export default function getOsCpu(): string | "no" {
    // @ts-ignore
    return navigator.oscpu || 'no';
  }
