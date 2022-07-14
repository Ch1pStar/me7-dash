import { Loader } from 'pixi.js';

const IMG_EXTENSIONS = ['jpeg', 'jpg', 'png'];
const SOUND_EXTENSIONS = ['wav', 'ogg', 'm4a'];
const context = require.context('./assets', true, /\.(jpg|png|wav|ttf|woff)$/im);

class AssetManager {
  constructor() {
    this.renderer = null;

    this._assets = {};
    this._sounds = {};
    this._images = {};

    this._importAssets();
  }

  /**
   * Manifest of all available images
   */
  get images() {
    return this._images;
  }

  /**
   * Manifest of all available sounds
   */
  get sounds() {
    return this._sounds;
  }

  /**
   * Manifest of all available assets
   */
  get assets() {
    return this._assets;
  }

  /**
     * Create a Loader instance and add the game assets to the queue
     *
     * @return {Promise} Resolved when the assets files are downloaded and parsed into texture objects
     */
  loadImages(images = this.images, progressCallback = () => {}) {
    const loader = new Loader('/');

    for (const [img, url] of Object.entries(images)) {
      loader.add(img, url);
    }

    loader.onProgress.add(() => progressCallback(loader.progress));

    return new Promise(loader.load.bind(loader));
  }

  _importAssets() {
    context.keys().forEach((filename) => {
      let [, id, ext] = filename.split('.'); // eslint-disable-line prefer-const
      const url = context(filename);

      id = id.substring(1);
      this._assets[id] = url;

      if (IMG_EXTENSIONS.indexOf(ext) > -1) {
        this._images[id] = url;
      }

      if (SOUND_EXTENSIONS.indexOf(ext) > -1) {
        this._sounds[id] = url;
      }
    });
  }

}

export default new AssetManager();
