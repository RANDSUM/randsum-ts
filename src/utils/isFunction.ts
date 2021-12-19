export function isFunction(functionProspect: unknown) {
  return (
    functionProspect &&
    {}.toString.call(functionProspect) === '[object Function]'
  )
}
