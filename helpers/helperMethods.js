/**
 *  Transform a file to a base64 string
 * @param file
 * @returns {Promise<unknown>}
 */
/*export default async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  }); */

/**
 *
 * @param {Object} data
 * @returns {FormData}
 */
export default {
  toFormData: data => {
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => formData.append(key, data[key]));
    return formData;
  },
  toBase64: file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    })
};
