function getUtools() {
  if (typeof utools !== 'undefined') return utools;
  if (typeof window !== 'undefined' && window.utools) return window.utools;
  return null;
}

/**
 * Action Handler for 'open_external_url'
 * Opens a URL in the user's default browser via utools.shellOpenExternal
 */
const openUrlHandler = {
  handle(itemData, ui, context) {
    if (itemData && itemData.url) {
      const uTools = getUtools();
      if (uTools && typeof uTools.shellOpenExternal === 'function') {
        uTools.shellOpenExternal(itemData.url);
      }
    }
  }
};

module.exports = openUrlHandler;
