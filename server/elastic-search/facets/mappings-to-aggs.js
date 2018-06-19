import { get } from "../../libs/object";
// TODO make

 /**
  *
  *
  * @param {object} properties elasitc search properties from mappings
  * @returns {object} aggrigation
  */
 function mappingToArgs(properties, path) {
  return Object.keys(properties)
    .filter(key => properties[key].type === "nested")
    .reduce((memo, key) => {
      let property = properties[key];
      let pathName = (path? path + "." : "") + key
      let aggs = Object.keys(property.properties)
        .reduce((memo, propKey) => {
          let keyword = get(['fields', 'raw', 'type'], property.properties[propKey]);
          if (keyword) {
            let label = `${propKey}s`;
            let field = `${pathName}.${propKey}.raw`;
            memo[label] =
              {
                terms: {
                  field
                }
              };
          }
          return memo
        }, {});
      if (!Object.keys(aggs).length) {
        aggs = mappingToArgs(property.properties, key)
      }
      memo[key] = {
        nested: {
          path: pathName
        },
        aggs
      }
      return memo;
    }, {});
}

  export default mappingToArgs;