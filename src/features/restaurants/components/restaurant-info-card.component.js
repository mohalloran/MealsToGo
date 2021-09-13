import React from "react";
import {Spacer} from '../../../components/spacer/spacer.component';
import styled from "styled-components/native";
import { Text, View, Image, StyleSheet } from "react-native";
import { Card } from 'react-native-paper';
import {Favourite} from '../../../components/favourites/favourite.component'
import { SvgXml } from 'react-native-svg';


//SVG File for star
import star from '../../../../assets/star';
import open from '../../../../assets/open';

//Styled components
const Title = styled.Text`
  font-family: ${(props)  => props.theme.fonts.heading}
  font-size: ${(props)  => props.theme.fontSizes.body}
  color: ${(props) => props.theme.colors.ui.primary}
`;

const Address = styled.Text`
  font-family: ${(props)  => props.theme.fonts.body}
  font-size: ${(props)  => props.theme.fontSizes.caption}
  color: ${(props) => props.theme.colors.ui.primary}
`;

const Info = styled.View`
  padding: ${(props)  => props.theme.space[3]}
`;

const Section= styled.View`
  flex-direction: row;
  align-items: center
  padding-top: ${(props) => props.theme.space[2]}
  padding-bottom: ${(props) => props.theme.space[2]}
`;

const Rating = styled.View`
  flex-direction: row;
`;

const Open = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary}
  margin-bottom: ${(props) => props.theme.space[3]}
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props)  => props.theme.space[3]}
  background-color: ${(props) => props.theme.colors.bg.primary}
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  
  const {
    name = 'Some restaurant',
    photos = ['https://media.istockphoto.com/photos/cup-of-coffee-picture-id504984010?k=6&m=504984010&s=612x612&w=0&h=VMq6F9EEmGWC834LvBHHj_s9er9h8CAN06uX-RhAx_U='],
    icon,
    address =  "100 some random street",
    isOpenNow = true,
    openingHours,
    rating = 4,
    isClosedTemporarily = true
  } = restaurant;

  //Math.ceil round it dont want to deal with fractions
  const ratingArray = Array.from(new Array(Math.ceil(rating)));
  
  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant}/>
      <RestaurantCardCover key={name} 
          source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>
          {
            ratingArray.map((rating,index) =>
              <SvgXml key={index} xml={star} width={20} height={20}/>
            )
          }
          </Rating>
          <Open>
            {isClosedTemporarily && (
              <Text variant="label" style={{color: "red"}} >
                CLOSED
              </Text>
            )}
            
              <Spacer variant={"left.small"}/>
              {
              isOpenNow && 
                  <SvgXml xml={open} width={20} height={20} />
              }
              <Spacer variant={"left.large"}/>
              <Image style={{ marginLeft: 16 ,width: 15, height: 15}} source={{uri:icon}}/>
          </Open>  
        </Section>
        <Address>{address}</Address>
      </Info>  

    </RestaurantCard>
  );
};
