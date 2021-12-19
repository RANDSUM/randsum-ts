export function isFunction(functionProspect: unknown): boolean {
  return (
    functionProspect
    ?  {}.toString.call(functionProspect) === '[object Function]'
    : false
  )
}
