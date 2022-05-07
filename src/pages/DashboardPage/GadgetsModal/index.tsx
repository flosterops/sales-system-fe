import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
  addComponent,
  loadAllowedComponents,
  loadUserDashboardComponents,
} from 'requests/component';
import TaskQueueImage from 'assets/images/task-queue.png';
import CustomersImage from 'assets/images/customers.png';
import BreakImage from 'assets/images/break.png';
import EnvelopeImage from 'assets/images/envelope.png';
import VehicleImage from 'assets/images/vehicle.png';
import { Description } from 'ui/Description';
import { Column } from 'ui/Layout';
import { TStore } from 'store';
import { EGadgetSize, EGadgetTypes, gadgetMapSizes, IGadget } from 'models/gadget';
import { ECookiesTypes } from 'models/cookies';
import { colors } from 'styles/colors';
import { AlignItemsTypes, EFontFamilies } from 'models/layout';
import { Button } from 'ui/Button';
import { useModal } from 'widgets/Modal/context';
import { EInputTypes } from 'models/forms';
import { userHasComponent } from 'helpers/gadget';
import { EIconTypes } from 'models/icons';
import { GadgetBar } from './GadgetBar';
import {
  ContentContainer,
  FooterContainer,
  HeaderContainer,
  HeaderTitle,
  ModalContainer,
  StyledField,
} from './styles';

interface IGadgetsType {
  id: number;
  name: string;
  type: EGadgetTypes;
  image: string;
}

const GadgetsMap = [
  { id: 1, name: 'Customers', type: EGadgetTypes.customers, image: CustomersImage },
  { id: 2, name: 'Task queue', type: EGadgetTypes.taskQueue, image: TaskQueueImage },
  { id: 3, name: 'Vehicles', type: EGadgetTypes.vehicles, image: VehicleImage },
  { id: 4, name: 'Break List', type: EGadgetTypes.breakList, image: BreakImage },
  { id: 5, name: 'New Enquiry', type: EGadgetTypes.newEnquiry, image: EnvelopeImage },
  {
    id: 6,
    name: 'Worker Statistics',
    type: EGadgetTypes.workerStatistics,
    image: EnvelopeImage,
  },
];

const GadgetsModal = (): ReactElement => {
  const dispatch = useDispatch();
  const { closeModal, options } = useModal();
  const size: EGadgetSize | null = options.size || null;
  const [gadgetsSearch, setGadgetsSearch] = useState<string>('');
  const { gadgets } = useSelector((state: TStore) => ({
    gadgets: state.gadgetsAllowed.gadgets,
  }));
  const { components } = useSelector((state: TStore) => ({
    components: state.userComponents.components,
  }));
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));

  const gadgetsSearchHandler = (event: any) => {
    event.preventDefault();
    setGadgetsSearch(event.target.value);
  };

  const addGadgetHandler = async (type: EGadgetTypes) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token && user) {
      const status = await addComponent(token, type, options.order);
      if (status) {
        await loadUserDashboardComponents(token, user.id || '', dispatch);
        closeModal();
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      loadAllowedComponents(token, dispatch);
    }
  }, [dispatch]);

  const getGadgetsToDisplay = (): IGadgetsType[] => {
    const result: IGadgetsType[] = [];

    gadgets.forEach((gadget: IGadget) => {
      if (!userHasComponent(components, gadget.type) && gadgetMapSizes[gadget.type] === size) {
        const idx = GadgetsMap.findIndex((el) => el.type === gadget.type);
        result.push(GadgetsMap[idx]);
      }
    });

    if (gadgetsSearch) {
      const reg = new RegExp(gadgetsSearch, 'i');
      return result.filter((el) => el.name.match(reg) !== null);
    }

    return result;
  };

  const gadgetsToDisplay = getGadgetsToDisplay();

  return (
    <ModalContainer>
      <HeaderContainer componentWidth="100%" ai={AlignItemsTypes.flexStart}>
        <Column>
          <HeaderTitle
            componentWidth="221px"
            componentHeight="33px"
            fontFamily={EFontFamilies.bree}
            color={colors.black}
          >
            Add widget
          </HeaderTitle>
        </Column>
        <Column componentWidth="230px">
          <StyledField
            name="search"
            type={EInputTypes.text}
            placeholder="Search widget"
            icon={EIconTypes.search}
            value={gadgetsSearch}
            onChange={gadgetsSearchHandler}
          />
        </Column>
      </HeaderContainer>
      <ContentContainer componentWidth="100%" componentHeight="100%">
        <Column>
          {!gadgetsToDisplay.length && <Description>No Widgets Available</Description>}
          {!!gadgetsToDisplay.length &&
            gadgetsToDisplay.map((el) => (
              <GadgetBar
                key={el.id}
                name={el.name}
                type={el.type}
                image={el.image}
                onClick={addGadgetHandler}
              />
            ))}
        </Column>
      </ContentContainer>
      <FooterContainer componentWidth="100%">
        <Column>
          <Button mleft="auto" onClick={closeModal}>
            Close
          </Button>
        </Column>
      </FooterContainer>
    </ModalContainer>
  );
};

export { GadgetsModal };
