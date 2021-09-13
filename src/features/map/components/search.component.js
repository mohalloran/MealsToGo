import React,{useState, useContext, useEffect} from "react";
import { View, Text } from "react-native";
import {Searchbar} from 'react-native-paper';

import styled from "styled-components/native";

import { LocationContext } from '../../../services/location/location.context';

//Styled components.props.theme passed from app Themeprovider
const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;

`;

export const Search = () => {

  //useContext(LocationContext) makes values available to us .
  //search function made available to us in the LocationContext
  const {keyword, search} = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword); 

  useEffect(() => {
      setSearchKeyword(keyword);
  },[keyword]);

  return (
        <SearchContainer>
            <Searchbar 
              placeholder="Search for a location"
              icon="map"
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
