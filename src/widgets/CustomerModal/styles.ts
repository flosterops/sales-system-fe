import styled from 'styled-components';
import { Box } from 'ui/Box';
import { Title } from 'ui/Title';

export const CustomerModalBox = styled(Box)`
  @media (max-height: 860px) {
    width: 50vw;
  }
`;

export const AddTaskTitle = styled(Title)`
  position: absolute;
  top: 20px;
  left: 30px;
`;

export const FieldsWrapper = styled.div`
  @media (max-height: 860px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;
