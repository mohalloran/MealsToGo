import  { mocks,  mockImages} from './mock';
import camelize from "camelize";

export const restaurantsRequest = (location) => {

    return new Promise((resolve,reject) => {
        
        //pulls back all the data associated with the location codes
        //location will be the geo locations as the key and the city will
        //be the value and have a JSON object file associated with it .
        const mock = mocks[location];
        
        if(!mock){
            reject("Location Not Found")
        }
        resolve(mock);
    });
 
}

export const restaurantsTransform = ({ results = [] }) => {
    const mappedResults = results.map((restaurant) => {

        //Dont have photos being returned so going to randomly pick one
        restaurant.photos = restaurant.photos.map((p) => {
            return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
        });
        
        return {
            ...restaurant,
            address: restaurant.vicinity,
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY"
        }
    });
    
    const newResult = camelize(mappedResults)
    return newResult;
}
// restaurantsRequest()
//     .then(restaurantsTransform)
//     .then( (transformedResponse) => {
//         console.log('results is :',transformedResponse[0].isOpenNow);   
//     }).catch( (err) => {
//         //console.log('Got and error:',err);
// })
