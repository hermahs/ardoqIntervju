import * as React from 'react';
import { Station } from './types/Station';

const SearchResult = (props: {results: Station[], parentCallback: (data: Station) => void}) => {

    const onClickStation = (station: Station) => {
        props.parentCallback(station);
    }

    return (
        <div className="stationShowcase-container">
            <div className="blurBackdrop"></div>
            {
                props.results.length < 6 && props.results.map((station, i) => {
                    return (
                        <div className="stationShowcase" key={station.stationId} onClick={() => onClickStation(station)}>
                            <p style={{fontWeight: "bold"}}>{station.name}</p>
                            <p>ledige: {station.available}</p>
                        </div>
                    );
                })
                
            }
        </div>
    )

}

export default SearchResult;