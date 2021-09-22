import React, { useState, useRef } from 'react';
import {
  TextInput as RnTextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, TextInput } from './styles';
import theme from '../../global/theme';

interface IProps {
  title: string;
  marginTop: number;
}

const Search: React.FC<IProps> = ({ title, marginTop }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RnTextInput>(null);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <Container marginTop={marginTop}>
        <Icon
          name="search"
          size={RFValue(16)}
          color={
            isFocused ? theme.colors.primary : theme.colors.placeHolderText
          }
        />
        <TextInput
          ref={inputRef}
          placeholderTextColor={theme.colors.placeHolderText}
          placeholder={title}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
