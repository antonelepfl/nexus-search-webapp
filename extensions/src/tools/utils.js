
function objToQueryString(obj) {
  // transform a obj to query params element
  function encode(key, value) {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
  const encodedParams = Object.keys(obj)
    .map(key => `${encode(key, obj[key])}`).join('&');
  return `?${encodedParams}`;
}

function getIdByUrl(url) {
  // get the last part of the url that corresponds to ID
  return url.split('/').pop();
}

function generateNotebookParamsObject(entityId) {
  const objParams = {
    replaceText: getIdByUrl(entityId),
  };
  return objToQueryString(objParams);
}

function getTypeById(entityId) {
  // TODO: use nexus library to split nexusId and get the type
  const result = entityId.split('/');
  // get the type based on the URL of V0
  return result.splice(7, 1)[0];
}

export {
  generateNotebookParamsObject,
  getIdByUrl,
  objToQueryString,
  getTypeById,
};
