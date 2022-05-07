export enum EModalTypes {
  BreakWindow = 'BreakWindow',
  GadgetsModal = 'GadgetsModal',
  ConfirmationWindow = 'ConfirmationWindow',
  VehicleAssignCustomer = 'VehicleAssignCustomer',
  InterestedVehicle = 'InterestedVehicle',
  NewTaskComponent = 'NewTaskComponent',
  AssignTaskModal = 'AssignTaskModal',
  AddTaskModal = 'AddTaskModal',
  AddEditWebsiteUserModal = 'AddEditWebsiteUserModal',
  AddPaymentModal = 'AddPaymentModal',
  RequestPaymentModal = 'RequestPaymentModal',
  LogOutModal = 'LogOutModal',
  ChangeDeliveryModal = 'ChangeDeliveryModal',
}

export interface IModalContext {
  id: EModalTypes | '';
  options: any;
  openModal: (id: EModalTypes | '', options?: any, state?: any) => void;
  closeModal: () => void;
}
