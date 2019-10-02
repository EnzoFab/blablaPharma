/**
 *  Transform a file to a base64 string
 * @param file
 * @returns {Promise<unknown>}
 */
export default async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
