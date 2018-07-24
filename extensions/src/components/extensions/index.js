
import createExtension from '@/tools/component-wrapper';

import testEntityComponents from './test';
import meModelComponents from './me-model';
import eModelComponents from './e-model';

const entityComponents = {
  test: testEntityComponents,
  meModel: meModelComponents,
  eModel: eModelComponents,
};

/**
 * Returns an array of extension classes for a particular entity type.
 *
 * This function will be called in React when we import the extensions module
 *
 * @param {string} type - Nexus Entity Type
 *
 * @returns {Extension[]}
 */
function getByEntityType(type) {
  return entityComponents[type].map(component => createExtension(component));
}

/**
 * List all the entitiy types which have according extensions
 *
 * @returns {string[]}
 */
function listAvailableEntityTypes() {
  return Object.keys(entityComponents);
}

export default {
  getByEntityType,
  listAvailableEntityTypes,
};
