import React from 'react';
import { JustifyContentTypes } from 'models/layout';
import { Loader } from 'ui/Loader';
import { AddOrderButton } from 'widgets/AddOrderButton';
import { AddTaskButton } from 'widgets/AddTaskButton';
import { useParams } from 'react-router-dom';
import { Row } from 'ui/Layout';
import { CustomerInfo } from 'widgets/CustomerInfo';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { useCustomerDetailsUser } from '../hooks';
import { ButtonsContainer } from './styles';

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, user, setUser } = useCustomerDetailsUser(id);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <Row jc={JustifyContentTypes.spaceBetween} mbottom="25px">
      <CustomerInfo customerData={user as IWebsiteUserDetails} handleDataUpdated={setUser} />
      <div>
        <ButtonsContainer componentWidth="390px" jc={JustifyContentTypes.spaceBetween}>
          {user && <AddOrderButton userId={user.id} />}
          <AddTaskButton clientId={String(user.id)} />
        </ButtonsContainer>
      </div>
    </Row>
  );
};

export { CustomerDetails };
