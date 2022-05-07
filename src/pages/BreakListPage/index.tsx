import React from 'react';
import { Row } from 'ui/Layout';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import BreakListTable from 'widgets/BreakListTable';
import { Title, TitleTags } from 'ui/Title';
import { Box } from 'ui/Box';
import { SearchInput } from '../DashboardPage/SearchInput';
import { TableContainer } from './styles';

const BreakListPage = () => (
  <>
    <Header />
    <NavBar />
    <Row componentWidth="50vw" margin="30px auto">
      <SearchInput />
    </Row>
    <Row padding="0 40px" jc={JustifyContentTypes.center}>
      <TableContainer>
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.l}
        >
          Break List
        </Title>
        <Box padding="10px 30px" mtop="17px" mbottom="22px">
          <BreakListTable />
        </Box>
      </TableContainer>
    </Row>
  </>
);

export { BreakListPage };
