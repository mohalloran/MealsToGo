import React, {useCallback, useContext, useState} from "react";
import {TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { List, Avatar, RadioButton } from 'react-native-paper';
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.components";
import styled from 'styled-components/native';
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsItem = styled(List.Item)`
    padding: ${props => props.theme.space[3] }
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const RadioView = styled(View)`
     margin-top: 20px;
     width: 100%;
     align-items: center;
     
`;

const RadioViewAnother = styled(View)`
     display: flex;
     width: 30%;
     align-items: flex-start;
     
`;
const RadioGroup = styled(RadioButton.Group)`
     display: flex;
     flex: 1;
     width: 50%;
     flex-direction: row;
     align-items: center;
`

const RadioGroupAnother = styled(RadioButton.Group)`
     display: flex;
     align-items: flex-start;
     width: 30%;
`

export const SettingsScreen = ({navigation}) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [profilePicUri, setProfilePicUri] = useState(null);
  const [cameraView, setCameraView] = useState('front');
  
  const getProfilePic = async (currentUser) => {
    const profileUri = await AsyncStorage.getItem(`${currentUser.uid}-profilephoto`);
    setProfilePicUri(profileUri);
  };

  //from react-navigation/native .Triggered when the screen comes into focus
  //or the user changes
  useFocusEffect(
    useCallback(() => {
       console.log('User changed...');
       getProfilePic(user);
    },[user])
  );
  
  return (
    <SafeArea>
    
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera",{cameraview:cameraView})}>
            {!profilePicUri ?
                (
                  <Avatar.Icon 
                     size={180} 
                     icon="human"
                     backgroundColor="#2182BD" />
                ):(
                  <Avatar.Image
                     size={180} 
                     source={{ uri: profilePicUri}}
                     backgroundColor="#2182BD" /> 
                )
            }    
        </TouchableOpacity>
        <Spacer position="top" size="large"/>
        <Text variant="label">{user.email}</Text>
       
      </AvatarContainer>

      <RadioView>
        <Text>Camera View</Text>
        <RadioGroup onValueChange={newValue => setCameraView(newValue)} value={cameraView} >
            <RadioButton.Item label="Front" value="front" />
            <RadioButton.Item label="Back" value="back"/>
        </RadioGroup>
      </RadioView>

      <List.Section>
      
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
