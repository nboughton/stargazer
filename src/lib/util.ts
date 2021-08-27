import sanitize from 'sanitize-html'

export function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const validTags = ['br', 'b', 'i', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li']
export function stripTags (text: string): string {
  return sanitize(text, {
    allowedTags: validTags
  })
}
