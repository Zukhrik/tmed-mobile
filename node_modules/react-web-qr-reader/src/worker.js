// jsQR is concatenated by gulp

self.addEventListener('message', function (e) {
  try {
    var decoded = jsQR(e.data.data, e.data.width, e.data.height);

    if (decoded) {
      postMessage(decoded);
    } else {
      postMessage(null);
    }
  } catch (error) {
    console.log('Error decoding', error)
    postMessage(null);
  }

});
