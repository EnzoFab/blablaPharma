/**
 *  Create configuration for the
 *
 * @param {object} state
 * @returns {function(*, *, *=): {headers: *, method: *, data: *, url: *}}
 */
export default state => {
  const token = state.token;
  return (method, url, data = {}) => ({
    method,
    url,
    data,
    headers: token ? { authorization: `Bearer ${token}` } : undefined
  });
};
