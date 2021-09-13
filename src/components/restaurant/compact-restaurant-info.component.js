import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {Text} from '../typography/text.component';
import styled from 'styled-components/native';

const CompactImage = styled.Image`
     border-radius: 10px;
     width: 120px;
     height: 120px;
`;

const CompactWebview = styled(WebView)`
     border-radius: 10px;
     width: 120px;
     height:120px;
`;

const TextView = styled(Text)`
     height: 30px;
`;


const Item = styled.View`
     border-radius: 15px;
     padding:10px;
     max-width: 120px;
     align-items: center;
     height: 100%;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({restaurant}) => {
    
    const Image = isAndroid ? CompactWebview : CompactImage;
    return (
        <Item>
            <Image source={{uri:restaurant.photos[0]}}/>
            <TextView center variant="caption" numberOfLines={3} >
                {restaurant.name}
            </TextView>
        </Item>
        
    )
}