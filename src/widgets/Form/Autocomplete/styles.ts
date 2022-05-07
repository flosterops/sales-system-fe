import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { globalStyles } from 'styles/global';

export const StyledAutocomplete = styled(AsyncSelect)`
  width: 100%;
  > div:first-child {
    ${globalStyles.fonts.default};
    ${globalStyles.fontSizes.default};
    height: ${globalStyles.global.componentHeight}px;
    padding: 0 0 0 12px;
    position: relative;
  }
`;
