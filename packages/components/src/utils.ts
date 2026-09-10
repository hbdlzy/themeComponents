export function toCssSize(width: string | number | undefined): string | undefined {
  if (width == null || width === '') return undefined
  return typeof width === 'number' ? `${width}px` : String(width)
}
