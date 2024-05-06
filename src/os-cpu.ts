export default function getOsCpu(): string | undefined {
    // @ts-ignore
    return navigator.oscpu || 'no';
  }
