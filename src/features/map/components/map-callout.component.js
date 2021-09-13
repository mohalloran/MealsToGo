import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {CompactRestaurantInfo} from '../../../components/restaurant/compact-restaurant-info.component';
import { Card } from 'react-native-paper';

const MyText = styled(Text)`
    
`;
const CalloutContainer = styled(View)`
     width: 60px;
     height: 60px;
     background-color: white;
`;

const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary}
  margin-bottom: ${(props) => props.theme.space[3]}
  width: 80px;
  height: 80px;
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props)  => props.theme.space[3]}
  background-color: ${(props) => props.theme.colors.bg.primary}
  width: 100%;
  height: 100%;
`;

export const MapCallout = ({restaurant}) => {
    
    return (
         <CompactRestaurantInfo restaurant={restaurant} />
    )
}