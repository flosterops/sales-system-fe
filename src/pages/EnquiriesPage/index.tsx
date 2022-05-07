import React, { ReactElement } from 'react';
import { Header } from 'widgets/Header';
import { Row } from 'ui/Layout';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { NavBar } from 'widgets/NavBar';
import { Title, TitleTags } from 'ui/Title';
import { EnquiriesTable } from './EnquiriesTable';
import { EnquiriesContainer } from './styles';

const EnquiriesPage = (): ReactElement => (
  <>
    <Header />
    <NavBar />
    <Row componentWidth="50vw" margin="30px auto">
      <SearchInput />
    </Row>
    <Row padding="0 40px" jc={JustifyContentTypes.center}>
      <EnquiriesContainer>
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.l}
        >
          Enquiries
        </Title>
        <EnquiriesTable />
      </EnquiriesContainer>
    </Row>
  </>
);

export { EnquiriesPage };
