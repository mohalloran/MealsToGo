import React, {useState, createContext, useEffect, useContext, useMemo} from 'react';

import { locationRequest, locationTransform } from './location.service';
//Create a global Context
export const LocationContext = createContext();

//LocationContext.provider will wrap the app and make state available to children
export const LocationContextProvider = ({children}) => {

    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [keyword, setKeyword] = useState("San Francisco");

    useEffect(() => {
       if( !keyword.length) {

           return;
       }
       locationRequest(keyword.toLowerCase())
        .then( locationTransform )
        .then( result => {
            setLocation(result);
            
            setIsLoading(false);
        }).catch( (err) => {
            setIsLoading(false);
            setError(err);
            
        })
    },[keyword]);//keyword changes we go find our location Data (locationRequest)

    //locationRequest returns a promise and .then returns a promise
    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword)
    }

    //when component mounts
    useEffect(() => {
        onSearch(keyword);
    },[]);

    return (
        <LocationContext.Provider
            value={{
                location: location,
                isLoading: isLoading,
                error: error,
                search: onSearch,
                keyword,
            }}>
            {children}
        </LocationContext.Provider>
    )
}




