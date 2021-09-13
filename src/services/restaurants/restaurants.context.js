import React, {useState, createContext, useEffect, useContext, useMemo} from 'react';

import { restaurantsRequest, restaurantsTransform } from './restaurants.service';
import { LocationContext } from '../location/location.context';
//Create a global Context
export const RestaurantsContext = createContext();

//RestaurantContext.provider will wrap the app and make state available to children
export const RestaurantsContextProvider = ({children}) => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const {location} = useContext(LocationContext);//grab location
    

    //Note .then returns a promise so you can chain the promises
    const retrieveRestaurants = (loc) => {

        setIsLoading(true);
        setRestaurants([]);
        setTimeout( () => {
            //const locationString = `${location.lat},${location.lng}`
            restaurantsRequest(loc)
            .then(restaurantsTransform)
            .then((restaurantData) => {
                setRestaurants(restaurantData); 
                setIsLoading(false);
            }).catch((err) =>{
                setError(err);
                setIsLoading(false);
            })

        }, 2000);
    }

    //when component mounts
    useEffect(() => {
        if(location){
            locationString = `${location.lat},${location.lng}`
            retrieveRestaurants(locationString);
        }
    },[location]);//when the location context changes retrieve the restaurants

    return (
        <RestaurantsContext.Provider
            value={{
                 restaurants: restaurants,
                 isLoading: isLoading,
                 error: error
             }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
}