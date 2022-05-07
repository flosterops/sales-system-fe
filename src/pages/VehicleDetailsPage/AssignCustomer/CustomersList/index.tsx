import React from 'react';
import { IWebsiteUser } from 'models/webiste-user';
import { StyledBox } from './style';
import { Description } from '../../../../ui/Description';

interface ICustomersList {
  customers: IWebsiteUser[];
}

const CustomersList = ({ customers }: ICustomersList) => (
  <StyledBox>
    {!customers.length && <Description>No Search results</Description>}
    <ul>
      {!!customers.length &&
        customers.map((customer) => (
          <li>
            {customer.id} - {customer.firstname} {customer.lastname}
          </li>
        ))}
    </ul>
  </StyledBox>
);

export { CustomersList };
