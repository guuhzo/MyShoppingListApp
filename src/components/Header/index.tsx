import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Container, Content, Title, Options } from './styles';
import theme from '../../global/theme';

type IProps = {
  title: string;
  canGoBack: boolean;
  handleBack(): unknown;
};

const Header: React.FC<IProps> = ({
  title,
  children,
  canGoBack,
  handleBack,
}) => {
  const [taps, setTaps] = useState(0);
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => setTaps(taps + 1)}>
      <Container>
        <StatusBar animated backgroundColor={theme.colors.primary} />
        <Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {canGoBack && (
              <TouchableOpacity
                style={{ marginRight: RFValue(8) }}
                onPress={handleBack}
              >
                <Icon
                  name="arrow-left"
                  color={theme.colors.altText}
                  size={RFValue(20)}
                />
              </TouchableOpacity>
            )}
            <Title>
              {title + (!canGoBack && taps > 0 && taps < 5 ? ` (${taps})` : '')}
            </Title>
          </View>
          <Options>
            {!canGoBack && taps >= 5 && (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Icon
                  name="tool"
                  size={RFValue(16)}
                  color={theme.colors.altText}
                />
              </TouchableOpacity>
            )}
            {children}
          </Options>
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Header;
