/**
 * URL for a file under `public/assets/`. Use instead of importing from `src/assets`.
 */
export function publicAsset(fileName) {
  return encodeURI(`${import.meta.env.BASE_URL}assets/${fileName}`);
}
