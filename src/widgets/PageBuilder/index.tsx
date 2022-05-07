import React, { ReactElement, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IPageBuilderConfig } from 'models/route';
import { pageComponentTypes } from 'helpers/constants';
import { useSelector } from 'react-redux';
import { store, TStore } from 'store';
import { Modal } from 'widgets/Modal';
import { authUser } from 'store/reducers/user-reducer/actions';
import { Loader } from 'ui/Loader';
import { Notification } from 'widgets/Notification';

interface IPageBuilder {
  config: IPageBuilderConfig[];
}

const PageBuilder = ({ config }: IPageBuilder) => {
  const { loading } = useSelector((state: TStore) => ({
    loading: state.user.loading,
  }));

  useEffect(() => {
    store.dispatch(authUser());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Notification />
      <Switch>
        {config.map((element: IPageBuilderConfig): ReactElement => {
          if (element.redirect) {
            return <Redirect key={element.id} to={element.redirect} />;
          }

          const Component = pageComponentTypes[element.componentType];
          return (
            <Route key={element.id} path={element.route} exact={element.exact}>
              <Component />
            </Route>
          );
        })}
      </Switch>
      <Modal />
    </BrowserRouter>
  );
};

export { PageBuilder };
