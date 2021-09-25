import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { rgba } from 'polished';

export const FloatActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  margin-right: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16) + (isIphoneX() ? getBottomSpace() : 0)}px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const FiltersContainer = styled.View`
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  margin-bottom: ${RFValue(12)}px;
  flex-direction: row;
  align-items: center;
`;

export const FiltersButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-left: ${RFValue(8)}px;
`;

interface IFilterButtonProp {
  pressed: boolean;
  color: string;
}
export const FilterButton = styled.TouchableOpacity<IFilterButtonProp>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: ${RFValue(8)}px;
  padding: ${RFValue(8)}px;
  padding-top: ${RFValue(4)}px;
  padding-bottom: ${RFValue(4)}px;
  margin-left: ${RFValue(4)}px;
  background-color: ${({ color }) => color};
`;

interface IFilterButtonTextProp {
  color: string;
}
export const FilterButtonText = styled.Text<IFilterButtonTextProp>`
  color: ${({ color }) => color};
  font-size: ${RFValue(16)}px;
  margin-left: ${RFValue(8)}px;
  font-weight: bold;
`;
