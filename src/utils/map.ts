import Map from "@arcgis/core/Map.js";
import WebMap from "@arcgis/core/WebMap.js";

import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import * as pieChartRendererCreator from "@arcgis/core/smartMapping/renderers/pieChart.js";
import * as clusterLabelCreator from "@arcgis/core/smartMapping/labels/clusters.js";

export const initMap = (container: HTMLDivElement) => {
    // const map: Map = new Map({
    //     basemap: 'streets-vector'
    // });
    const map: WebMap = new WebMap({
        portalItem: {
            id: 'de5331c548fb49388059d3bfb24f0aad'
        }
    });
    const view: MapView = new MapView({
        container: container,
        map: map
    });
    //addParksLayers(map);
}

const addParksLayers = (map: Map) => {
    const parks: FeatureLayer = new FeatureLayer({
        portalItem: {
            id: '2162ade0b746456a84017175567c71b3'
        }
    });
    const greenways: FeatureLayer = new FeatureLayer({
        portalItem: {
            id: '23836bb9145943d485252d9665020ff1'
        }
    });
    map.addMany([parks, greenways]);
}

const addGreenwaysLayer = (map: Map) => {
    const layer: FeatureLayer = new FeatureLayer({
        portalItem: {
            id: '23836bb9145943d485252d9665020ff1'
        }
    });
    map.add(layer);
}

const getPermitRenderer = (): UniqueValueRenderer => {
    return new UniqueValueRenderer({
        field: 'permitclassmapped',
        uniqueValueInfos:[
            {value: 'Residential', symbol: new SimpleMarkerSymbol({
                style: 'circle',
                color: 'red',
                size: 12,
                outline: {
                    style: 'none',
                    width: 0
                }                
            })},
            {value: 'Non-Residential', symbol: new SimpleMarkerSymbol({
                style: 'circle',
                color: 'blue',
                size: 12,
                outline: {
                    style: 'none',
                    width: 0
                }
            })}                
        ]
    });
}

const setClustering = async (layer: FeatureLayer, view: MapView) => {
   const {renderer, fields} = await pieChartRendererCreator.createRendererForClustering({
    layer, shape: 'pie'
   });
   layer.featureReduction = {
    type: 'cluster',
    fields,
    renderer
   } as any;   
   const { labelingInfo, clusterMinSize } = await clusterLabelCreator.getLabelSchemes({
    layer, view
   }).then((labelSchemes) => labelSchemes.primaryScheme);
   (layer.featureReduction as __esri.FeatureReductionCluster).labelingInfo = labelingInfo;
   (layer.featureReduction as __esri.FeatureReductionCluster).clusterMinSize = clusterMinSize;


} 