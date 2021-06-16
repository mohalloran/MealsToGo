import React, {useState, createContext, useEffect, useContext, useMemo} from 'react';

import { restaurantsRequest, restaurantsTransform } from './restaurants.service';
//Create a global Context
export const RestaurantsContext = createContext();

//RestaurantContext.provider will wrap the app and make state available to children
export const RestaurantsContextProvider = ({children}) => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const retrieveRestaurants = () => {

        setIsLoading(true);
        setTimeout( () => {
            restaurantsRequest()
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
        retrieveRestaurants();
    },[]);

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