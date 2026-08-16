/**
 * Action Handler for 'open_external_url'
 * Opens a URL in the user's default browser via utools.shellOpenExternal
 */
function openUrlHandler(item) {
  if (item && item.url) {
    if (typeof utools !== 'undefined' && typeof utools.shellOpenExternal === 'function') {
      utools.shellOpenExternal(item.url);
    }
  }
}

module.exports = openUrlHandler;
