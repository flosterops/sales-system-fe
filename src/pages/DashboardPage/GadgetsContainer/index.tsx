import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from 'store';
import { Row } from 'ui/Layout';
import { GadgetsWrapper } from 'ui/Gadget/GadgetsWrapper';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import {
  EGadgetSize,
  EGadgetTypes,
  gadgetManagerType,
  gadgetMapSizes,
  IGadgetDashboardComponent,
} from 'models/gadget';
import { GadgetsManagerWidget } from 'pages/DashboardPage/GadgetsManagerWidget';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { loadUserDashboardComponents } from 'requests/component';
import { GadgetComponent } from './GadgetComponent';

export interface IGadgetGrid {
  type: EGadgetTypes | typeof gadgetManagerType;
  order: number;
  id?: string;
  size?: EGadgetSize;
}

const getGadgetNumericSize = (type: EGadgetTypes) => {
  if (gadgetMapSizes[type]) {
    switch (gadgetMapSizes[type]) {
      case EGadgetSize.small:
        return 1;
      case EGadgetSize.medium:
        return 2;
      default:
        return 3;
    }
  }

  return 0;
};

// TODO: Try to resolve solution easier and make function smaller.
const mapGadgetsToGrid = (userGadgets: IGadgetDashboardComponent[]): IGadgetGrid[] => {
  let rowCounter = 0;
  const componentsDataToDisplay: IGadgetGrid[] = [];
  userGadgets.forEach((gadget, index) => {
    const componentSize = getGadgetNumericSize(gadget.type);
    const rowCompare = rowCounter + componentSize;
    if (rowCompare <= 3) {
      // If component fit in current row;
      rowCounter = rowCompare;
      componentsDataToDisplay.push({ type: gadget.type, order: index, id: gadget.id });
      if (rowCompare === 3) {
        // If row is full then move to the next;
        rowCounter = 0;
      }
    } else {
      // If component not fit to the row (too large), add manager component (if left some space) and move to the next row;
      const size = 3 - rowCounter === 1 ? EGadgetSize.small : EGadgetSize.medium;
      componentsDataToDisplay.push({
        type: gadgetManagerType,
        order: index,
        size,
      });
      if (componentSize === 3) {
        componentsDataToDisplay.push({ type: gadget.type, order: index, id: gadget.id });
        rowCounter = 0;
      } else {
        rowCounter = componentSize;
      }
    }
  });

  // For last row.
  if (rowCounter === 1 || rowCounter === 2) {
    componentsDataToDisplay.push({
      type: gadgetManagerType,
      order: componentsDataToDisplay.length + 1,
      size: 3 - rowCounter === 1 ? EGadgetSize.small : EGadgetSize.medium,
    });
  }

  return componentsDataToDisplay;
};

const GadgetsContainer = (): ReactElement => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const { components } = useSelector((state: TStore) => ({
    components: state.userComponents.components,
  }));
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));

  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (user && token) {
      loadUserDashboardComponents(token, user.id || '', dispatch);
    }
  }, [dispatch, user]);

  const componentsGridData = mapGadgetsToGrid(components);
  return (
    <>
      <GadgetsWrapper
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        wrap={true}
        mtop="10px"
      >
        <Row componentWidth="85%" wrap={true} gap="20px">
          {componentsGridData.map((gadget, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <GadgetComponent {...gadget} key={index} order={index + 1} />
          ))}
        </Row>
        <Row componentWidth="85%" mtop="20px" mbottom="20px">
          <GadgetsManagerWidget
            size={EGadgetSize.large}
            onClick={(size: EGadgetSize) =>
              openModal(EModalTypes.GadgetsModal, {
                size,
                order: componentsGridData.length + 1,
              })
            }
          />
        </Row>
      </GadgetsWrapper>
    </>
  );
};

export { GadgetsContainer };
