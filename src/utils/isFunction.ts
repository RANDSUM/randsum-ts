export const isFunction = (functionProspect: any) => {
  return (
    functionProspect &&
    {}.toString.call(functionProspect) === '[object Function]'
  )
}
