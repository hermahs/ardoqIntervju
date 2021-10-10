import * as React from "react";
import { Station } from "./types/Station";
import bike from './svg/pedal_bike_black_24dp.svg';


const StationInfo = (props: {activeStation: Station | null, active: boolean, handleClose: () => void}) => {
    return (
        <div className={(props.active) ? "stationInfoContainer": "stationInfo disabled"}>
            {
                props.activeStation !== null && (
                    <div className="stationInfo">
                        <h3>{props.activeStation.name}</h3>
                        <div className="divider"></div>
                        <div className="info">
                            <div className="tilgjengelig"><img src={bike} alt="sykkel"/><p>Tilgjengelig: {props.activeStation.available} ut av {props.activeStation.capacity}</p></div>
                        </div>
                        <div className="close" onClick={props.handleClose}></div>
                    </div>
                )
            }
        </div>
    )
}

export default StationInfo;