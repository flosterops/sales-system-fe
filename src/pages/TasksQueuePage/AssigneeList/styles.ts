import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';
import { Box } from 'ui/Box';
import { zIndexes } from 'styles/constants';
import { colors } from 'styles/colors';

export const AssigneeListContainer = styled(Box)<ILayout>`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 300px;
  z-index: ${zIndexes.modal};

  & .infinite-scroll-component__outerdiv {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const Selectable = styled(Row)<ILayout>`
  border-bottom: 1px solid ${colors.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.primary};
    color: ${colors.white};
  }

  &:not(:hover) {
    &:hover {
      background: ${colors.white};
      color: ${colors.primary};
    }
  }
`;
