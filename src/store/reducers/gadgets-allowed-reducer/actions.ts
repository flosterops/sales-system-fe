import { IGadget } from 'models/gadget';
import { IGadgetState } from './types';

export const setGadgetsAction = (state: IGadgetState, action: { payload: IGadget[] }) => {
  state.gadgets = action.payload;
};
