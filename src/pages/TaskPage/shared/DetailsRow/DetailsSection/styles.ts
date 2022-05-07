import styled from 'styled-components';

export const DetailsSectionWrapper = styled.div<{ fullWidth?: boolean }>`
  width: ${(props) => (props.fullWidth ? '100%' : '50%')};
`;
