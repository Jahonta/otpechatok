export default function getIndexedDB(): boolean | undefined {
    try {
      return !!window.indexedDB
    } catch (e) {
      /* SecurityError when referencing it means it exists */
      return true
    }
  }
