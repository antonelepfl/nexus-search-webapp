
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import last from 'lodash/last';

import http from './http';


/**
 * Returns object with prefix free properties
 *
 * @param {Object} src Source object to remove propertie profixes
 *
 * @returns {Object}
 *
 * @example
 * ```
 *   const entity = { '@id': 'idStr', 'nxv:deprecated': false };
 *   const prefixFreeEntity = { id: 'idStr', deprecated: false }
 *   assert.deepEqual(removePropPrefixes(entity), prefixFreeEntity);
 * ```
 */
function removePropPrefixes(src) {
  if (isArray(src)) {
    return src.map(arrayVal => removePropPrefixes(arrayVal));
  }

  if (isObject(src)) {
    const prefixFreeObj = Object.keys(src).reduce((resObj, srcKey) => {
      const prefixFreeKey = last(srcKey.split(':')).replace(/@/, '');
      return Object.assign({ [prefixFreeKey]: removePropPrefixes(src[srcKey]) }, resObj);
    }, {});

    return prefixFreeObj;
  }

  return src;
}

/**
 * Loads content of nexus entity with given id, it's linked entities and
 * returns normalized object according to provided configuration.
 *
 * @param {string} idUrl        Nexus entity id.
 * @param {Object} [normConf]   Normalization config, describes desired structure
 *                                for normalized entity to return.
 * @param {Function} [changeCb] Will be called every time new part of nested entities
 *                                arrives, normalized entity with available data
 *                                will we passed as argument.
 *
 * @returns {Promise}           Resolved with normalized entity object
 *                                once all nested data is loaded
 */
async function fetchEntity(idUrl, normConf = {}, changeCb = () => {}) {
  const { data: prefixedEntity } = await http.get(idUrl);
  const entity = removePropPrefixes(prefixedEntity);
  changeCb(entity);

  const nestedEntityFetches = [];

  if (!isObject(normConf)) return entity;

  Object.keys(normConf).forEach((key) => {
    const nestedChangeCb = (nestedEntity) => {
      entity[key].content = nestedEntity;
      changeCb(entity);
    };

    const nestedEntityFetch = fetchEntity(entity[key].id, normConf[key], nestedChangeCb);
    nestedEntityFetches.push(nestedEntityFetch);
  });

  return Promise.all(nestedEntityFetches).then(() => entity);
}


export default {
  fetchEntity,
};