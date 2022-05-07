import { css } from 'styled-components';
import { EButtonsVariants } from 'models/button';
import { colors } from './colors';

const buttonStyles = {
  [EButtonsVariants.primary]: css`
    background: ${colors.primary};
    color: ${colors.white};
  `,
  [EButtonsVariants.danger]: css`
    background: ${colors.error};
    color: ${colors.white};
  `,
  [EButtonsVariants.warning]: css`
    background: ${colors.yellow};
    color: ${colors.white};
  `,
  [EButtonsVariants.info]: css`
    background: ${colors.turquoise};
    color: ${colors.white};
  `,
  [EButtonsVariants.light]: css`
    background: ${colors.light};
    color: ${colors.white};
  `,
  [EButtonsVariants.white]: css`
    background: ${colors.white};
    color: ${colors.primary};
  `,
  [EButtonsVariants.transparent]: css`
    background: ${colors.transparent};
    color: ${colors.primary};
  `,
  [EButtonsVariants.disabled]: css`
    background: ${colors.primary};
    color: ${colors.white};
    opacity: 0.5;
  `,
  [EButtonsVariants.turquoise]: css`
    background: ${colors.turquoise};
    color: ${colors.white};
  `,
};

export { buttonStyles };
