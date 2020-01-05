import words from "lodash.words";
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
    }),

  /**
   *  Test if the string is a url
   * @param str
   * @returns {*}
   */
  isUrl: str => {
    if (!str) {
      return false;
    }

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return str.match(regex);
  },

  /**
   * Return the cover of a youtube video
   * @param {String} videoId
   * @returns {{high_quality: string, low_quality: string}}
   */
  getYoutubeCoverImage: videoId => ({
    high_quality: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    low_quality: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }),

  getReadingTime: text => Math.ceil(text ? words(text).length / 250 : 0)
};
