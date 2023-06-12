import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
export const initMap = (container: HTMLDivElement) => {

    const map: WebMap = new WebMap({
        portalItem: {
            id: 'de5331c548fb49388059d3bfb24f0aad'
        }
    });
    new MapView({
        container: container,
        map: map
    });
}
