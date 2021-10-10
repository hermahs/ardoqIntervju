export interface Station {
    lat: number,
    long: number,
    name: string,
    stationId: number,
    address: string,
    capacity: number,
    available: number
}

export async function loadStations(): Promise<Station[]> {
    const s: Station[] = [];
    const data = await Promise.all([fetch("http://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"), fetch("http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")]);
    data.forEach( d => {
        if(d.status !== 200) {
            console.error('err: ' + d.status);
            return;
        }
    });

    const statInfo = (await data[0].json()).data.stations;
    const statStatus = (await data[1].json()).data.stations;
    statInfo.sort((a: any, b: any) => {return Number.parseInt(a.station_id) > Number.parseInt(b.station_id) ? 1 : -1;});
    statStatus.sort((a: any, b: any) => {return Number.parseInt(a.station_id) > Number.parseInt(b.station_id) ? 1 : -1;});
    for(let i = 0; i < statInfo.length; i++) {

        let lat: number = statInfo[i].lat;
        let long: number = statInfo[i].lon;
        let name: string = statInfo[i].name;
        let stationId: number = Number.parseInt(statInfo[i].station_id);
        let address: string = statInfo[i].address;
        let capacity: number = statInfo[i].capacity;
        let available: number = statStatus[i].num_bikes_available;

        s.push({
            lat: lat,
            long: long,
            name: name,
            stationId: stationId,
            address: address,
            capacity: capacity,
            available: available
        });
    }

    return s;
}

export function searchStation(name: string, stations: Station[]): Station | undefined {
    return stations.find((station) => station.name.toLowerCase().includes(name.toLowerCase()));
}

export function searchStationMultiple(name: string, stations: Station[]): Station[] {
    const s: Station[] = [];

    stations.forEach(station => {
        if(station.name.toLowerCase().includes(name.toLowerCase())) s.push(station);
    });

    return s;
}