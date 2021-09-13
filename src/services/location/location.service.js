import camelize from "camelize";
import { locations } from "./locations.mock";

/**
 * returns the location data for the city or searchTerm .
 * @param  searchTerm 
 */

export const locationRequest = (searchTerm) => {
    return new Promise( (resolve, reject) => {
        const locationMock = locations[searchTerm];
        if(!locationMock){
            reject("Location Not Found")
        }
        resolve(locationMock);
    })
}

export const locationTransform = (result) => {
    const formattedResponse = camelize(result);
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat:lat, lng:lng, viewport:geometry.viewport}
    
}