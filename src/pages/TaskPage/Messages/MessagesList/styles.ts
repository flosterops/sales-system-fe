import styled from 'styled-components';
import { Column } from 'ui/Layout';

export const MessagesContainer = styled(Column)`
  max-height: 600px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;
