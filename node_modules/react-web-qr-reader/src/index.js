import React from 'react';
const { Component } = React;

import {
  func,
  oneOfType,
  number,
  bool,
  oneOf,
  string,
  any,
  object,
} from 'prop-types';
import { getDeviceId } from './getDeviceId';
import havePropsChanged from './havePropsChanged';
import createBlob from './createBlob';

// Require adapter to support older browser implementations
import 'webrtc-adapter';

// Inline worker.js as a string value of workerBlob.
let workerBlob = createBlob([__inline('../dist/worker.js')], {
  type: 'application/javascript',
});

// Props that are allowed to change dynamically
const propsKeys = ['delay', 'facingMode'];

export default class Reader extends Component {
  static propTypes = {
    onScan: func.isRequired,
    onError: func.isRequired,
    onLoad: func,
    onImageLoad: func,
    delay: oneOfType([number, bool]),
    facingMode: oneOf(['user', 'environment']),
    cameraId: string,
    resolution: number,
    showViewFinder: bool,
    style: any,
    className: string,
    constraints: object,
  };
  static defaultProps = {
    delay: 500,
    resolution: 600,
    facingMode: 'environment',
    showViewFinder: true,
    constraints: null,
  };

  els = {};

  constructor(props) {
    super(props);

    this.state = {
      mirrorVideo: false,
    };

    // Bind function to the class
    this.initiate = this.initiate.bind(this);
    this.check = this.check.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearComponent = this.clearComponent.bind(this);
    this.handleReaderLoad = this.handleReaderLoad.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
    this.handleWorkerMessage = this.handleWorkerMessage.bind(this);
    this.setRefFactory = this.setRefFactory.bind(this);
  }

  componentDidMount() {
    // Initiate web worker execute handler according to mode.
    this.worker = new Worker(URL.createObjectURL(workerBlob));
    this.worker.onmessage = this.handleWorkerMessage;
    this.initiate();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // React according to change in props
    const changedProps = havePropsChanged(this.props, nextProps, propsKeys);

    for (const prop of changedProps) {
      if (prop == 'facingMode') {
        this.clearComponent();
        this.initiate(nextProps);
        break;
      } else if (prop == 'delay') {
        if (this.props.delay == false) {
          this.timeout = setTimeout(this.check, nextProps.delay);
        }
        if (nextProps.delay == false) {
          clearTimeout(this.timeout);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    // Only render when the `propsKeys` have changed.
    const changedProps = havePropsChanged(this.props, nextProps, propsKeys);
    return changedProps.length > 0;
  }

  componentWillUnmount() {
    // Stop web-worker and clear the component
    if (this.worker) {
      this.worker.terminate();
      this.worker = undefined;
    }
    this.clearComponent();
  }

  clearComponent() {
    // Remove all event listeners and variables
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if (this.stopCamera) {
      this.stopCamera();
    }
    if (this.reader) {
      this.reader.removeEventListener('load', this.handleReaderLoad);
    }
    if (this.els.img) {
      this.els.img.removeEventListener('load', this.check);
    }
  }

  initiate(props = this.props) {
    const { onError, facingMode, cameraId } = props;

    // Check browser facingMode constraint support
    // Firefox ignores facingMode or deviceId constraints
    const isFirefox = /firefox/i.test(navigator.userAgent);
    const isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);

    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getSupportedConstraints === 'function'
    ) {
      const supported = navigator.mediaDevices.getSupportedConstraints();
      const constraints = {};

      if (supported.facingMode) {
        constraints.facingMode = { ideal: facingMode };
      }
      if (supported.frameRate) {
        constraints.frameRate = { ideal: 25, min: 10 };
      }

      const vConstraintsPromise =
        isSafari || isFirefox
          ? Promise.resolve(props.constraints || constraints)
          : getDeviceId(facingMode, undefined, cameraId).then((deviceId) =>
              Object.assign({ facingMode }, { deviceId }, props.constraints)
            );

      vConstraintsPromise
        .then((video) => navigator.mediaDevices.getUserMedia({ video }))
        .then(this.handleVideo)
        .catch(onError);
    } else {
      console.error('browser does not support "navigator.mediaDevices"');
    }
  }

  handleVideo(stream) {
    const { preview } = this.els;
    const { facingMode } = this.props;

    // Preview element hasn't been rendered so wait for it.
    if (!preview) {
      return setTimeout(this.handleVideo, 200, stream);
    }

    // Handle different browser implementations of MediaStreams as src
    if ((preview || {}).srcObject !== undefined) {
      preview.srcObject = stream;
    } else if (preview.mozSrcObject !== undefined) {
      preview.mozSrcObject = stream;
    } else if (window.URL.createObjectURL) {
      preview.src = window.URL.createObjectURL(stream);
    } else if (window.webkitURL) {
      preview.src = window.webkitURL.createObjectURL(stream);
    } else {
      preview.src = stream;
    }

    // IOS play in fullscreen
    preview.playsInline = true;

    const streamTrack = stream.getTracks()[0];
    // Assign `stopCamera` so the track can be stopped once component is cleared
    this.stopCamera = streamTrack.stop.bind(streamTrack);

    preview.addEventListener('loadstart', this.handleLoadStart);

    this.setState({
      mirrorVideo: facingMode == 'user',
      streamLabel: streamTrack.label,
    });
  }

  handleLoadStart() {
    const { delay, onLoad } = this.props;
    const { mirrorVideo, streamLabel } = this.state;
    const preview = this.els.preview;
    preview.play();

    if (typeof onLoad == 'function') {
      onLoad({ mirrorVideo, streamLabel });
    }

    if (typeof delay == 'number') {
      this.timeout = setTimeout(this.check, delay);
    }

    // Some browsers call loadstart continuously
    preview.removeEventListener('loadstart', this.handleLoadStart);
  }

  check() {
    const { resolution, delay } = this.props;
    const { preview, canvas } = this.els;

    // Get image/video dimensions
    let width = Math.floor(preview.videoWidth);
    let height = Math.floor(preview.videoHeight);

    // Canvas draw offsets
    let hozOffset = 0;
    let vertOffset = 0;

    // Crop image to fit 1:1 aspect ratio
    const smallestSize = width < height ? width : height;
    const ratio = resolution / smallestSize;

    height = ratio * height;
    width = ratio * width;

    vertOffset = ((height - resolution) / 2) * -1;
    hozOffset = ((width - resolution) / 2) * -1;

    canvas.width = resolution;
    canvas.height = resolution;

    const previewIsPlaying =
      preview && preview.readyState === preview.HAVE_ENOUGH_DATA;

    if (previewIsPlaying) {
      const ctx = canvas.getContext('2d');

      ctx.drawImage(preview, hozOffset, vertOffset, width, height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Send data to web-worker
      this.worker.postMessage(imageData);
    } else {
      // Preview not ready -> check later
      this.timeout = setTimeout(this.check, delay);
    }
  }

  handleWorkerMessage(e) {
    const { onScan, delay } = this.props;
    const decoded = e.data;

    if (decoded) {
      onScan(decoded);
    }

    if (typeof delay == 'number' && this.worker) {
      this.timeout = setTimeout(this.check, delay);
    }
  }

  handleInputChange(e) {
    const selectedImg = e.target.files[0];
    this.reader.readAsDataURL(selectedImg);
  }

  handleReaderLoad(e) {
    // Set selected image blob as img source
    this.els.img.src = e.target.result;
  }

  openImageDialog() {
    // Function to be executed by parent in user action context to trigger img file uploader
    this.els.input.click();
  }

  setRefFactory(key) {
    return (element) => {
      this.els[key] = element;
    };
  }

  render() {
    const { style, className, showViewFinder } = this.props;
    const containerStyle = {
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      paddingTop: '100%',
    };
    const hiddenStyle = { display: 'none' };
    const previewStyle = {
      top: 0,
      left: 0,
      display: 'block',
      position: 'absolute',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    };
    const videoPreviewStyle = {
      ...previewStyle,
      objectFit: 'cover',
      transform: this.state.mirrorVideo ? 'scaleX(-1)' : undefined,
    };
    const viewFinderStyle = {
      top: 0,
      left: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      border: '20px solid rgba(0, 0, 0, 0.3)',
      boxShadow: 'inset 0 0 0 5px rgba(255, 0, 0, 0.5)',
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    return (
      <section className={className} style={style}>
        <section style={containerStyle}>
          {showViewFinder ? <div style={viewFinderStyle} /> : null}
          <video
            style={videoPreviewStyle}
            ref={this.setRefFactory('preview')}
          />
          <canvas style={hiddenStyle} ref={this.setRefFactory('canvas')} />
        </section>
      </section>
    );
  }
}
