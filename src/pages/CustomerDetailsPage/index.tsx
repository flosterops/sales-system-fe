import React, { ReactElement } from 'react';
import { Header } from 'widgets/Header';
import { AlignItemsTypes } from 'models/layout';
import { Column, Row } from 'ui/Layout';
import { Redirect, useParams } from 'react-router-dom';
import { ERouteLinks } from 'models/route';
import { TabComponent } from 'widgets/TabComponent';
import { NavBar } from 'widgets/NavBar';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { CUSTOMER_TABS } from './helpers';

const CustomerDetailsPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Redirect to={ERouteLinks.customers} />;
  }

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      <Column ai={AlignItemsTypes.center} padding="40px">
        <TabComponent tabs={CUSTOMER_TABS} />
      </Column>
    </>
  );
};

export { CustomerDetailsPage };
