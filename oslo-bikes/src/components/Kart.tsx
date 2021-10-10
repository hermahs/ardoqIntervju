
import * as React from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import SearchBar from './SearchBar';
import StationInfo from './StationInfo';
import { loadStations, Station } from './types/Station';

const Kart = () => {
    const [stations, setStations] = React.useState<Station[]>([]);
    const [activeStation, setActiveStation] = React.useState<Station | null>(null);
    const [showActiveStation, setShowActiveStation] = React.useState<boolean>(false);

    React.useEffect(() => {
        loadStations().then((data) => {
            setStations(data);
        });
    }, []);

    const handleOnClickSearchResult = (station: Station) => {
        setActiveStation(station);
        toggleInfo(station);
    }

    const toggleInfo = (station: Station) => {
        setActiveStation(station);
        setShowActiveStation(true);
    }

    const handleClose = () => {
        setShowActiveStation(false);
    }

    return (
        <div>
            <SearchBar stations={stations} parentCallback={handleOnClickSearchResult}/>
            <Map className="map" viewport={{center: (activeStation !== null) ? [activeStation.lat, activeStation.long] : undefined, zoom: (activeStation !== null) ? 20 : 13} } animate={true} scrollWheelZoom={true} Maxbounds={[[90, -180], [90,180]]}  bounds={[[59.95,10.7522], [59.88,10.7522], [59.88,10.7322], [59.9139,10.722]]} center={[59.9139, 10.7522]}>
                <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {
                    stations.map((s, i) => {
                        return(
                            <Marker position={[s.lat, s.long]} key={s.stationId} onclick={() => toggleInfo(s)}>
                            </Marker>
                        );
                    })
                }
            </Map>
            <StationInfo activeStation={activeStation} active={showActiveStation} handleClose={handleClose}/>
        </div>
    )
};

export default Kart;