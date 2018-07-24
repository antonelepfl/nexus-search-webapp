
import axios from 'axios';

/**
 * This will be the wrapper of actual axios library so we can add
 * authorization headers for all the extensions.
 */

let axiosInstance = null;

function setNexusAuth(token) {
  const instance = axios.create({
    headers: { Authorization: token },
  });
  axiosInstance = instance;
}

function getAxios() {
  /**
   * To access Nexus data from an extension just
   *
   * import { getAxios } from '@/services/http-svc';
   *
   * getAxios().get(...)
   */
  return axiosInstance;
}

export {
  setNexusAuth,
  getAxios,
};
