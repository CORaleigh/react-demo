import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
import Search from "@arcgis/core/widgets/Search.js";
import Legend from "@arcgis/core/widgets/Legend.js";

const map: WebMap = new WebMap({
    portalItem: {
        id: 'de5331c548fb49388059d3bfb24f0aad'
    }
});
const view: MapView = new MapView({map: map});
export const initMap = async (container: HTMLDivElement): Promise<MapView> => {
    view.container = container;
    addSearchWidget(view);
    await view.when();
    return view;
}

export const getParks = async (): Promise<__esri.Graphic[]> => {
    const layer = view.map.layers.find(layer => layer.title === 'Raleigh Park Amenities');
    let parks:__esri.Graphic[] = [];
    if (layer) {
        const results = await (layer as __esri.FeatureLayer).queryFeatures({
            where: '1=1',
            outFields: ['PARK_NAME'],
            returnGeometry: true,
            orderByFields: ['PARK_NAME']
        });
        if (results.features) {
            parks = results.features;
        }
    }
    return parks;
}

export const updateParks = async (expression: string) => {
    const layer = view.map.layers.find(layer => layer.title === 'Raleigh Park Amenities') as __esri.FeatureLayer;
    if (layer) {
        layer.definitionExpression = expression;
        layer.refresh();
        const extent = await layer.queryExtent({where: expression});
        view.goTo(extent);
    }
}

const addSearchWidget = (view: MapView) => {
    const search: Search = new Search({view: view});
    view.ui.add(search, 'top-right');
}

export const addLegendWidget = (container: HTMLDivElement) => {
    new Legend({view: view, container: container});
}