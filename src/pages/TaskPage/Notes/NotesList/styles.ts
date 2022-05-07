import styled from 'styled-components';
import { Box } from 'ui/Box';
import { Row } from 'ui/Layout';
import { globalStyles } from 'styles/global';
import { colors } from 'styles/colors';

export const NotesContainer = styled.div`
  max-height: 600px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const NoteContainer = styled(Row)`
  min-height: 230px;
`;
export const NoteBox = styled(Box)`
  min-height: 150px;
`;
export const NoteTypeLabel = styled.div`
  position: absolute;
  background-color: #f5f5f5;
  padding: 13px 20px 13px 20px;
  border-radius: 0 10px 0 10px;
  color: ${(props) => props.color};
  font-weight: bold;
  border-top: 1px solid ${colors.white};
  border-right: 1px solid ${colors.white};
  ${globalStyles.weight[800]}
  ${globalStyles.fontSizes.xs};
  text-align: center;
  width: 12%;
  right: -1px;
  top: -1px;
`;
