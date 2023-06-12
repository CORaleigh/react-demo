import { useEffect, useRef } from 'react'
import './App.css'
import { initMap } from './utils/map';
function App() {
  const mapDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapDiv.current) {
      initMap(mapDiv.current);
    }
  }, []);
  return (
    <>
      <div ref={mapDiv}></div>
    </>
  )
}
export default App
