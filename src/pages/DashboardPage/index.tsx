import React, { ReactElement } from 'react';
import { Row } from 'ui/Layout';
import { GadgetsWrapper } from 'ui/Gadget/GadgetsWrapper';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { SearchInput } from './SearchInput';
import { NewTaskWidget } from './NewTaskWidget';
import { DailyTasksWidget } from './DailyTasksWidget';
import { PieChartWidget } from './PieChartWidget';
import { GadgetsContainer } from './GadgetsContainer';

const DashboardPage = (): ReactElement => (
  <>
    <Header />
    <NavBar />
    <Row componentWidth="50vw" margin="30px auto">
      <SearchInput />
    </Row>
    <GadgetsWrapper>
      <Row componentWidth="85%" mbottom="10px" gap="20px">
        <NewTaskWidget />
        <PieChartWidget />
        <DailyTasksWidget />
      </Row>
    </GadgetsWrapper>
    <GadgetsContainer />
  </>
);

export { DashboardPage };
