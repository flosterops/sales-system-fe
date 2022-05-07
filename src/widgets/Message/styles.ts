import styled from 'styled-components';
import { Column, Row } from 'ui/Layout';

export const MessageContainer = styled(Column)`
  margin: 13px 0 13px 0;
`;

export const MessageRow = styled(Row)`
  font-size: 14px;
  padding: 19px;
  border-radius: 10px;
  display: block;
  width: 90%;
`;

export const DateRow = styled(Row)`
  font-size: 14px;
`;

export const TitleRow = styled(Row)`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
`;

export const BodyRow = styled(Row)`
  font-size: 14px;
  display: block;
`;
