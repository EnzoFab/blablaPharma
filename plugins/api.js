import requestBuilder from "../utils/requestBuilder";

export default function({ app, $axios }, inject) {
  // IOT use $auth which will contains auth methods
  // inject in the global scope several function use to authenticate

  const builder = requestBuilder($axios);

  const keys = Object.keys(builder);

  for (const key of keys) {
    inject(key, builder[key]);
  }
}
