import  { mocks,  mockImages} from './mock';
import camelize from "camelize";

export const restaurantsRequest = (location= "37.7749295,-122.4194155") => {

    return new Promise((resolve,reject) => {
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
        //console.log('Restaurant is :',restaurant.openingHours.openNow)
        return {
            ...restaurant,
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY"
        }
    });
    //console.log(mappedResults);
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
