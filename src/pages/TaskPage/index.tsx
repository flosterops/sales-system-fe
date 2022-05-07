import React, { ReactElement } from 'react';
import { Row } from 'ui/Layout';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { JustifyContentTypes } from 'models/layout';
import { TabComponent } from 'widgets/TabComponent';
import { TASK_DETAILS_TABS } from './constants';

const TaskPage = (): ReactElement => (
  <>
    <Header />
    <NavBar />
    <Row componentWidth="50vw" margin="30px auto">
      <SearchInput />
    </Row>
    <Row jc={JustifyContentTypes.center}>
      <TabComponent tabs={TASK_DETAILS_TABS} />
    </Row>
  </>
);

export { TaskPage };
