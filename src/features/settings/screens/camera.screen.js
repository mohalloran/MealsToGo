import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Container = styled(View)`
     flex: 1
`;
const ProfileCamera = styled(Camera)`
  flex: 1;
`;

const ButtonContainer = styled(View)`
    flex: 1;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SnapText = styled(Text)`
    font-size: 18px;
    color: white
`;

export const CameraScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const {user} = useContext(AuthenticationContext);

  const cameraRef = useRef();

  let {cameraview} = route.params;
  //let cameraview = navigation.getParam('cameraview','front');
  console.log('Camera View is',cameraview);

  const snap = async () => {
    
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-profilephoto`, photo.uri);
      navigation.goBack();
    }

  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   
    //Camera.Constants.Type.back
    <Container>
        <ProfileCamera
            ref={(camera) => (cameraRef.current = camera)}
            type={cameraview}
        >
          <ButtonContainer >
            <TouchableOpacity onPress={() => {
                snap();
            }}>
                <SnapText> Click me to take Picture </SnapText>
            </TouchableOpacity>      
          </ButtonContainer>
      </ProfileCamera>    
    </Container>
   
  );
};