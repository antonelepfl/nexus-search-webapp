
import createExtension from '@/tools/component-wrapper';
import { setAuthToken } from '@/services/http';

import testEntityComponents from './test';

const entityComponents = {
  test: testEntityComponents,
};

/**
 * Returns an array of extension classes for a particular entity type.
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

/**
 *
 * Set the authorization so all the extensions can interact with protected data.
 *
 * @param {string} token - Bearer token (with Bearer string included)
 */
function setExtensionsAuthToken(token) {
  setAuthToken(token);
}

export default {
  getByEntityType,
  listAvailableEntityTypes,
  setExtensionsAuthToken,
};
