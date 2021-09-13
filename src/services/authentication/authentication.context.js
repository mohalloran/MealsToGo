import React ,{createContext, useState} from 'react';
import { loginRequest } from './authentication.service'
import * as firebase from "firebase";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState(null);
    const [ user, setUser] = useState(null);
    const [ isAuthenticated, setIsAuthenticated] = useState(false);

    //check if there is a current logged in Session .
    firebase.auth().onAuthStateChanged((usr) => {
        if(usr) {
            setUser(usr);
            setIsAuthenticated(true);
            setIsLoading(false);
        }else{
            setIsLoading(false)
            setIsAuthenticated(false);
        }
    })

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password).then((u) => {
            setUser(u);
            setIsAuthenticated(true);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setIsAuthenticated(false);

            //console.log('type of error is',typeof e);
            //console.log("isValidJson is ",typeof JSON.parse(JSON.stringify(e)));
            //console.log("Ojbect is ",JSON.parse(JSON.stringify(e)).message);
            //console.log("ERROR is ",e);
            
            //error comes back as some type of Object.Convert to JSON String
            //then convert to Javascript object and get the message .
            let jsonString = JSON.stringify(e);     //convert to JSON String
            let javascriptObject = JSON.parse(jsonString);//convert to javascript object
            let message = javascriptObject.message;
            
            setError(message);
        })
    }

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if(password !== repeatedPassword){
            setError("Error: Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password ).then((u) => {
            setUser(u);
            setIsAuthenticated(true);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setIsAuthenticated(false);

                     
            //error comes back as some type of Object.Convert to JSON String
            //then convert to Javascript object and get the message .
            let jsonString = JSON.stringify(e);     //convert to JSON String
            let javascriptObject = JSON.parse(jsonString);//convert to javascript object
            let message = javascriptObject.message;
            
            setError(message);
        })
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading,
                error,
                onLogin,
                isAuthenticated,
                onRegister,
                onLogout
            }}
        >

           {children}
        </AuthenticationContext.Provider>
    )
}
