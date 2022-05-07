import styled from 'styled-components';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';
import { Title } from 'ui/Title';
import { LoaderContainer } from 'ui/Loader';
import { zIndexes } from 'styles/constants';
import { ILayout } from 'ui/Layout';
import { Box } from 'ui/Box';

export const StyledDescription = styled(Description)`
  ${globalStyles.fontSizes.xxm}
  line-height: 1.5;
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

export const AddModalContainer = styled(Box)<ILayout>`
  ${LoaderContainer} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${zIndexes.modal + 1};
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
