/** Supabase の PostgrestError は Error を継承しないプレーンオブジェクトなので、instanceof Error では拾えない。 */
export function getErrorMessage(e: unknown, fallback: string): string {
  if (e instanceof Error) return e.message
  if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message
  }
  return fallback
}
