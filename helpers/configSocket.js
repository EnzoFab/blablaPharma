/**
 *  Create configuration for the
 *
 * @param {object} state
 * @returns {function(*, *, *=): {headers: *, method: *, data: *, url: *}}
 */
export default store => {
  const token = store.rootState.token;
  return (method, url, data = {}) => {
    const config = {
      method,
      url,
      data,
      headers: token ? { authorization: `Bearer ${token}` } : undefined
    };
    return { config, store };
  };
};
