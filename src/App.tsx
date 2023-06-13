import { useEffect, useRef, useState } from 'react'
import './App.css'
import { addLegendWidget, getParks, initMap } from './utils/map';

import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-action-bar';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-panel';
import {
  CalciteShell,
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel
} from "@esri/calcite-components-react";
import ParkSelect from './ParkSelect';


function App() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const loaded = useRef<boolean>(false);
  const [selectedPanel, setSelectedPanel] = useState<string>('Filter');
  const [parks, setParks] = useState<__esri.Graphic[]>([]);
  const [expression, setExpression] = useState<string>('');
  const legendDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current && !loaded.current) {
      initMap(mapDiv.current).then(async () => {
        setParks(await getParks());
        if (legendDiv.current) {
          addLegendWidget(legendDiv.current);
        }
      });
      loaded.current = true;
    }
  }, []);
  return (
    <>
      <CalciteShell>
        <CalciteShellPanel slot='panel-start' position='start' collapsed={selectedPanel === ''}>
          <CalciteActionBar slot='action-bar'>
            <CalciteAction 
              text='Filter' 
              icon='filter' 
              active={selectedPanel === 'Filter' ? true : undefined}
              onClick={(e) => setSelectedPanel(e.currentTarget.text === "Filter" && e.currentTarget.active ? '' : 'Filter')}
            >
            </CalciteAction>
            <CalciteAction 
              text='Legend' 
              icon='legend' 
              active={selectedPanel === 'Legend' ? true : undefined}
              onClick={(e) => setSelectedPanel(e.currentTarget.text === "Legend" && e.currentTarget.active ? '' : 'Legend')}
            >
            </CalciteAction>
          </CalciteActionBar>
          <CalcitePanel heading='Filter' 
            closable 
            closed={selectedPanel !== 'Filter'}
            hidden={selectedPanel !== 'Filter'}
            onCalcitePanelClose={() => setSelectedPanel('')}
          >
            Test
            <ParkSelect parks={parks} updated={(expression: string) => setExpression(expression)}></ParkSelect>
            <p>{expression}</p>
          </CalcitePanel>
          <CalcitePanel heading='Legend' 
            closable 
            closed={selectedPanel !== 'Legend'}
            hidden={selectedPanel !== 'Legend'}
            onCalcitePanelClose={() => setSelectedPanel('')}
          >
            <div ref={legendDiv}></div>
          </CalcitePanel>          
        </CalciteShellPanel>
        <div ref={mapDiv}></div>        
      </CalciteShell>
    </>
  )
}
export default App
