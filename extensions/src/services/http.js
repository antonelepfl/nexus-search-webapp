
import axios from 'axios';

/**
 * This will be the wrapper of actual axios library so we can add
 * authorization headers for all the extensions.
 */

const http = axios.create();

function setAuthToken(token) {
  http.defaults.headers.common.Authorization = token;
}

export {
  setAuthToken,
  http,
};
