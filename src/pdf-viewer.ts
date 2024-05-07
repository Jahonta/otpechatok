export default function isPdfViewerEnabled(): boolean | "no" {
    return navigator.pdfViewerEnabled || "no"
  }
