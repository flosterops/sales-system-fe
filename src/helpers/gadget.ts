import {
  EGadgetTypes,
  IDashboardComponent,
  IDashboardComponentResponse,
  IGadget,
  IGadgetDashboardComponent,
} from 'models/gadget';
import { isEGadgetType } from './guards';

export const mapGadgetsToState = (data: IDashboardComponent[]): IGadget[] =>
  data
    .map((gadget: IDashboardComponent) => {
      if (isEGadgetType(gadget.dashboardComponentType)) {
        return { type: gadget.dashboardComponentType };
      }
      console.error(`gadget ${gadget} is not of EGadgetTypes`);
      return undefined;
    })
    .filter((value: IGadget | undefined): boolean => !!value) as IGadget[];

export const mapDashboardComponentsToState = (
  data: IDashboardComponentResponse[],
): IGadgetDashboardComponent[] =>
  data
    .map((gadget: IDashboardComponentResponse) => {
      if (isEGadgetType(gadget.dashboardComponent.dashboardComponentType)) {
        return { type: gadget.dashboardComponent.dashboardComponentType, id: gadget.id };
      }

      console.error(`gadget ${gadget} is not of EGadgetTypes`);
      return undefined;
    })
    .filter(
      (value: IGadgetDashboardComponent | undefined): boolean => !!value,
    ) as IGadgetDashboardComponent[];

export const userHasComponent = (
  state: IGadgetDashboardComponent[],
  type: EGadgetTypes,
): boolean => state.some((el) => el.type === type);
