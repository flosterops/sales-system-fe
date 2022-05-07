import styled from 'styled-components';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { Input } from 'widgets/Form/Input';

export const HeaderContainer = styled(Row)`
  margin-bottom: 27px;
`;

export const ContentContainer = styled(Row)`
  max-height: 430px;
  overflow-y: scroll;
  padding-right: 10px;
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #606eb2;
  }
`;
export const FooterContainer = styled(Row)``;

export const HeaderTitle = styled(Description)`
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
`;
export const ModalContainer = styled.div`
  width: 548px;
  height: 554px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  flex-direction: column;
`;

export const StyledField = styled(Input)`
  width: 230px;
`;
