import statObserver from '../Observer';
import * as constants from './Map.constants';
import * as mapUtils from './Map.utils';

export default class MainMap {
  constructor() {
    this.data = null;
    this.map = null;
    this.stateListener();
  }

  async render() {
    await mapUtils.addResources();
    this.map = mapUtils.buildMap(constants.mapOptions);
  }

  setMarkers() {
    mapUtils.setMarkers(this.map, this.data);
  }

  stateListener() {
    statObserver.subscribe((data) => {
      if ('map' in data) {
        this.data = data.map;
        this.setMarkers();
      }
    });
  }
}
