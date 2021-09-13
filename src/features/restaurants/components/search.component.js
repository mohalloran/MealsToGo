import React,{useState, useContext, useEffect} from "react";
import { View, Text } from "react-native";
import {Searchbar} from 'react-native-paper';

import styled from "styled-components/native";

import { LocationContext } from '../../../services/location/location.context';

//Styled components.props.theme passed from app Themeprovider
const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({isFavouritesToggled, onFavouritesToggle}) => {

  //useContext(LocationContext) makes values available to us .
  const {keyword, search, location} = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword); 

  return (
        <SearchContainer>
            <Searchbar 
              icon={ isFavouritesToggled ? "heart" : "heart-outline"}
              onIconPress={onFavouritesToggle}
              placeholder="Search for a location"
              value={searchKeyword}
              onSubmitEditing={() => {
                  search(searchKeyword);
              }}
              onChangeText={(text) => {
                  setSearchKeyword(text)
              }}

            />
        </SearchContainer>)
};
