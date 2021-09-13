import { StatusBar, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";

const isAndroid = Platform.OS === "android";
const androidPadding = 3;
const marginTop = isAndroid ? (StatusBar.currentHeight + androidPadding) : 0;

//Styled components
export const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${marginTop}px`};
    background-color: ${props => props.theme.colors.bg.primary}
`;