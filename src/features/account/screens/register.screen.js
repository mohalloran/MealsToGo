import React, { useContext, useState } from "react";
import {KeyboardAvoidingView, Platform} from 'react-native';
import { ActivityIndicator , Colors} from 'react-native-paper';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthInput,
  AuthButton,
  Title,
  ErrorContainer,
  KeyBoardAvoidingView,
  TitleContainer
} from "../components/account.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {AuthenticationContext} from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister,isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />

      <TitleContainer>
        <Title>Meals To Go</Title>
      </TitleContainer>

      <KeyBoardAvoidingView>
          <AccountContainer>
            <AuthInput
              label="E-mail"
              value={email}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />

            <Spacer variant={"top.large"} />

            <AuthInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              secure
              onChangeText={(text) => setPassword(text)}
            />

            <Spacer variant={"top.large"} />

            <AuthInput
              label="Repeat Password"
              value={repeatedPassword}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              secure
              onChangeText={(text) => setRepeatedPassword(text)}
            />

            <Spacer variant={"top.large"} />

            <ErrorContainer>
                {error &&
                        <Text variant="error">{error}</Text>
                }
            </ErrorContainer>

            <Spacer variant={"top.large"} />

            {!isLoading ? 
                (
                    <AuthButton
                      icon="email"
                      mode="contained"
                      onPress={() => onRegister(email, password, repeatedPassword)}
                    >
                      Register
                    </AuthButton>
                )
                :
                (
                  <ActivityIndicator animating={true} color={Colors.blue300} />
                )

            }

            <Spacer size="large"/>
            <AuthButton
              mode="contained"
              onPress={() => navigation.goBack()}
            >
              Back
            </AuthButton>
    
          </AccountContainer>
      </KeyBoardAvoidingView>
    </AccountBackground>
  );
};
