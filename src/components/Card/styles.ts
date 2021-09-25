import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainerProps {
  hasFooter?: boolean;
}
export const Container = styled.View<IContainerProps>`
  flex: 1;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.container};
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  margin-bottom: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  padding-top: ${RFValue(10)}px;
  padding-bottom: ${RFValue(10)}px;

  /* ${props =>
    props.hasFooter
      ? css`
          height: ${RFValue(104)}px;
        `
      : css`
          height: ${RFValue(40)}px;
        `} */
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${RFValue(24)}px;
  margin-right: ${RFValue(16)}px;
`;

export const BadgeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface ITitleProps {
  fontSize?: number;
}
export const Title = styled.Text<ITitleProps>`
  font-size: ${RFValue(20)}px;
  font-weight: bold;

  ${props =>
    props.fontSize &&
    css`
      font-size: ${RFValue(props.fontSize)}px;
    `}
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${RFValue(24)}px;
  margin-right: ${RFValue(24)}px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
`;
