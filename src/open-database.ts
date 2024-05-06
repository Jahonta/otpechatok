export default function getOpenDatabase(): boolean {
    // @ts-ignore
    return !!window.openDatabase
  }
