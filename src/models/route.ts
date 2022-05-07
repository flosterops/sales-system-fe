export interface IPageBuilderConfig {
  id: string;
  componentType: EPageComponentTypes;
  route: ERouteLinks;
  routeType: ERouteTypes;
  exact: boolean;
  redirect: ERouteLinks | null;
}

export enum ERouteLinks {
  login = '/',
  logOut = '#',
  dashboard = '/dashboard',
  task = '/task/:id',
  tasks = '/tasks',
  customers = '/customers',
  vehicles = '/vehicles',
  profile = '/profile',
  vehicleDetails = '/vehicle',
  enquiries = '/enquiries',
  finishedTasks = '/finished-tasks',
  customerDetails = '/customer-details/:id',
  addOrder = '/add-order',
  search = '/search',
}

export enum EPageComponentTypes {
  DashboardPage = 'DashboardPage',
  CustomersPage = 'CustomersPage',
  ProfilePage = 'ProfilePage',
  VehicleDetailsPage = 'VehicleDetailsPage',
  TasksQueuePage = 'TasksQueuePage',
  VehiclesPage = 'VehiclesPage',
  TaskPage = 'TaskPage',
  EnquiriesPage = 'EnquiriesPage',
  FinishedTasksPage = 'FinishedTasksPage',
  NotFoundPage = 'NotFoundPage',
  CustomerDetailsPage = 'CustomerDetailsPage',
  BreakListPage = 'BreakListPage',
  AddOrderPage = 'AddOrderPage',
  SearchPage = 'SearchPage',
  TokenPage = 'TokenPage',
}

export enum ERouteTypes {
  public = 'public',
  private = 'private',
}
