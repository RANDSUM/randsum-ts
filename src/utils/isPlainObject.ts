export function isPlainObject(objProspect: unknown) {
  return (
    typeof objProspect === 'object' &&
    objProspect !== null &&
    objProspect.constructor === Object &&
    Object.prototype.toString.call(objProspect) === '[object Object]'
  )
}
