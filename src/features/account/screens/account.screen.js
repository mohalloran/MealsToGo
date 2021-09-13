import React from 'react';
import {AccountBackground,
        AccountCover,
        AccountContainer,
        AuthButton,
        Title,
        AnimationWrapper,
        TitleContainer}
        from '../components/account.styles';

import LottieView from "lottie-react-native";

export const AccountScreen = ({navigation}) => {
  return (
      <AccountBackground>
          <AnimationWrapper>
            <LottieView
                key="animation"
                autoPlay
                loop
                resizeMode="cover"
                source={require("../../../../assets/watermelon.json")}
            />
          </AnimationWrapper>

          <AccountCover/>

          <TitleContainer>
                <Title>Meals To Go</Title>
          </TitleContainer>
          
          <AccountContainer>
            <AuthButton
               icon="lock-open-outline" 
               mode="contained" 
               onPress={() => navigation.navigate("login") }>
                   Login
            </AuthButton>
           
            <AuthButton
               title="Login"
               icon="email" 
               mode="contained" 
               onPress={() => navigation.navigate("register")}>
                   Register
            </AuthButton>
            

           </AccountContainer>
           
      </AccountBackground>
  )
  
}