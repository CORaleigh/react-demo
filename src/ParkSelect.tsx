
import { updateParks } from './utils/map';


import '@esri/calcite-components/dist/components/calcite-combobox';
import '@esri/calcite-components/dist/components/calcite-combobox-item';
import {
  CalciteCombobox,
  CalciteComboboxItem
} from "@esri/calcite-components-react";

interface ParkSelectProps {
    parks: __esri.Graphic[];
    updated: Function;
}

function ParkSelect(props: ParkSelectProps) {
  return (
    <>
        <CalciteCombobox 
            placeholder='Select parks by name' 
            label={'Select parks by name'}
            onCalciteComboboxChange={e => {
            const selectedParks = e.target.selectedItems.map(p => p.value.getAttribute('PARK_NAME'));
            const expression = e.target.selectedItems.length ? `PARK_NAME in ('${selectedParks.join("','")}')` : '1=1';
            updateParks(expression);
            props.updated(expression);
            }}
        >
            {props.parks.map(park => 
            <CalciteComboboxItem 
                key={park.getAttribute(`park-${park.getAttribute('OBJECTID')}`)} 
                textLabel={park.getAttribute('PARK_NAME')} 
                value={park} ></CalciteComboboxItem>
            )}
        </CalciteCombobox>
    </>
  )
}
export default ParkSelect
