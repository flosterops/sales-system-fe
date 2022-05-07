import React, { ComponentType, FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Row } from 'ui/Layout';
import { Title, TitleTags } from 'ui/Title';
import { EFontFamilies, FontSizeTypes } from 'models/layout';
import { usePermissionsHelpers } from 'helpers/use-permissions-helpers';
import { StyledTaskLink, TabContainer, TaskPageWrapper } from './styles';

interface ITabComponent {
  tabs: Array<{
    name: string;
    url: string;
    permissions: Array<string>;
    component: ComponentType;
  }>;
}

const TabComponent: FC<ITabComponent> = ({ tabs }) => {
  const match = useRouteMatch();
  const { checkPermissions } = usePermissionsHelpers();
  const filteredTabs = tabs.filter(({ permissions }) => checkPermissions(permissions));

  return (
    <TabContainer mbottom="45px">
      <Row>
        {filteredTabs.map(({ url, name }) => {
          // TODO rework for url param strong equal check
          const isActive = match.url.includes(url);

          return (
            <StyledTaskLink
              to={`${match.url}/${url}`}
              className={isActive ? 'active' : ''}
              key={url}
            >
              <Title
                fontSize={FontSizeTypes.l}
                tagName={TitleTags.default}
                fontFamily={EFontFamilies.bree}
              >
                {name}
              </Title>
            </StyledTaskLink>
          );
        })}
      </Row>
      <TaskPageWrapper>
        <Switch>
          {filteredTabs.map(({ url, component }) => (
            <Route path={`${match.path}/${url}`} key={url} component={component} />
          ))}
          <Redirect from="/" to={`${match.url}/${tabs[0]?.url}`} />
        </Switch>
      </TaskPageWrapper>
    </TabContainer>
  );
};

export { TabComponent };
