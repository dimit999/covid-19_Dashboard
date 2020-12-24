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
    this.map = mapUtils.buildMap(constants.mapOptions);
    this.setMarkers();
  }

  updateCoord(city) {
    let coords = constants.mapOptions.center;

    if (city) {
      coords = mapUtils.checkCountry(this.data, city);
    }

    mapUtils.changeCoordMap(this.map, coords);
  }

  setMarkers() {
    mapUtils.setMarkers(this.map, this.data);
  }

  stateListener() {
    statObserver.subscribe((data) => {
      if ('map' in data) {
        this.data = data.map;
        this.render();
      }
    });
  }
}
