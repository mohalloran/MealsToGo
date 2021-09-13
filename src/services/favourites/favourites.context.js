import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthenticationContext} from '../authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
    const {user} = useContext(AuthenticationContext);
    const [favourites, setFavourites] = useState([]);

    //Save Favourites to local storage.
    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value);

            //identify favorites for each individual user
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)

        }catch (e) {
            console.log('Error Storing', e);
        }
    }

    //get favourites from local Storage
    const loadFavourites = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if(value !== null)
              setFavourites(JSON.parse(value));
        }catch (e) {
            //console.log('Error Loading Favourite Data',e);
        }
    }

    const add = (restaurant) => {
        setFavourites([...favourites,restaurant]);
    }

    const remove = (restaurant) => {
        const newFavorites = favourites.filter((x) => x.placeId !== restaurant.placeId)
        setFavourites(newFavorites);
    }

    useEffect(() => {
        if(user)
            loadFavourites(user.uid);
    },[user]);//loads when the user changes

    useEffect(() => {
        if(user)
            saveFavourites(favourites,user.uid);
    },[favourites, user]);

    return (
        <FavouritesContext.Provider value={{
            favourites,
            addToFavourites: add,
            removeFromFavourites: remove
        }}>
            { children }
        </FavouritesContext.Provider>
    )
}

