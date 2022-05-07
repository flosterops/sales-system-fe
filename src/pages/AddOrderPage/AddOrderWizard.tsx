import React, { ReactElement } from 'react';
import { Column, Row } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { AddOrderSteps } from 'models/orders';
import { StyledStep } from './styles';

interface IAddOrderWizard {
  currentStep: AddOrderSteps;
}

const wizardSteps = [
  {
    id: '3fd577cf-3361-4863-890f-9eecbd35d146',
    label: 'Choose a vehicle',
    step: AddOrderSteps.findVehicle,
  },
  {
    id: '9d783bb0-aaa6-45ff-8273-0dd65e5ff463',
    label: 'Choose a customer',
    step: AddOrderSteps.findCustomer,
  },
  {
    id: 'f083d27f-0623-4c4f-8739-fe9e53f96288',
    label: 'Part Exchange',
    step: AddOrderSteps.partExchange,
  },
  {
    id: 'db22d5ff-9a84-4142-a3c9-8da4d6e328f1',
    label: 'Add ons & summary',
    step: AddOrderSteps.addOns,
  },
  {
    id: '69099bf8-89af-4375-bdb6-9ef1c052c48d',
    label: 'Collection or Delivery',
    step: AddOrderSteps.collectionDelivery,
  },
  {
    id: 'e3ab19d1-524f-43fb-89b6-0f1f1b96e254',
    label: 'Payment',
    step: AddOrderSteps.payment,
  },
];

const getStepIndex = (key: AddOrderSteps): number => Object.keys(AddOrderSteps).indexOf(key);

const AddOrderWizard = ({ currentStep }: IAddOrderWizard): ReactElement => {
  const currentStepIndex = getStepIndex(currentStep);

  return (
    <Column ai={AlignItemsTypes.center} padding="40px 0 0">
      <Row jc={JustifyContentTypes.spaceAround} componentWidth="75vw">
        {wizardSteps.map((step, index) => (
          <StyledStep
            key={step.id}
            touched={currentStepIndex > getStepIndex(step.step)}
            active={currentStep === step.step}
          >
            <div>{index + 1}.</div>
            <div>{step.label}</div>
          </StyledStep>
        ))}
      </Row>
    </Column>
  );
};

export { AddOrderWizard };
