import styled, { css } from 'styled-components';
import { Field } from 'widgets/Form/Field';
import { colors } from 'styles/colors';
import { Column, Row } from 'ui/Layout';
import { Button, IButton } from 'ui/Button';
import { EButtonsVariants } from 'models/button';

export const PreviewWrapper = styled(Row)`
  background: ${colors.lightGray};
  border-radius: 5px;
`;

export const PreviewColumn = styled(Column)`
  align-items: center;
  padding: 20px;
  column-gap: 24px;

  table td {
    padding: 5px 0;
  }

  table td:first-child {
    text-align: right;
    padding-right: 5px;
  }

  table td:nth-child(2) {
    font-weight: bold;
    text-align: left;
  }
`;

export const SpecificationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  flex-direction: column;
`;

export const HiddenField = styled(Field)`
  & > input {
    display: none;
  }
`;

export const ConditionButton = styled(Button)<IButton>`
  & button {
    font-weight: bold;
  }

  ${(props: IButton) =>
    props.variant === EButtonsVariants.white &&
    css`
      & button {
        border: 2px solid ${colors.primary};
      }
    `}
`;
