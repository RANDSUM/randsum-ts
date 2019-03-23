
export const isPlainObject = (objProspect: any) => {
  return  typeof objProspect === 'object'
  && objProspect !== null
  && objProspect.constructor === Object
  && Object.prototype.toString.call(objProspect) === '[object Object]';
}
