/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Text } from './styles';

interface IProps {
  iconName?: string;
  text: string;
  color: string;
  handlePress: any;
}

const OutlinedButton: React.FC<IProps> = ({
  iconName,
  text,
  color,
  handlePress,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Container borderColor={color}>
        {iconName && <Icon name={iconName} size={16} color={color} />}
        <Text color={color} marginLeft={iconName ? 4 : 0}>
          {text}
        </Text>
      </Container>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
