import words from "lodash.words";
import reduce from "lodash.reduce";
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

  getReadingTime: text => Math.ceil(text ? words(text).length / 250 : 0),

  getShareUrl: {
    facebook: (url, text) =>
      `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${text}`,
    twitter: (url, text) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    linkedIn: (url, summary) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&=${summary}`
  },

  buildQueryParams: (filters, defaultAccumulator = "?") => {
    return reduce(
      filters,
      (result, value, key) => {
        if (Array.isArray(value)) {
          const arrayQuery = value.reduce(
            (acc, val) => `${acc}&${key}=${val}`,
            ""
          );

          return `${result}&${arrayQuery}`;
        }

        return value || value === false ? `${result}&${key}=${value}` : result;
      },
      defaultAccumulator
    )
      .split("&&")
      .join("&")
      .split("?&")
      .join("?");
  }
};
