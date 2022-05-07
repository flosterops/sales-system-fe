import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user-reducer';
import { gadgetsAllowedReducer } from './gadgets-allowed-reducer';
import { taskReducer } from './task-reducer';
import { dashboardVehiclesReducer } from './dashboard-vehicles-reducer';
import { dashboardCustomersReducer } from './dashboard-customers-reducer';
import { timeTrackReducer } from './time-track';
import { dashboardTasksReducer } from './dashboard-task-reducer';
import { userComponentsReducer } from './user-components-reducer';

export default combineReducers({
  user: userReducer,
  gadgetsAllowed: gadgetsAllowedReducer,
  task: taskReducer,
  dashboardVehicles: dashboardVehiclesReducer,
  dashboardCustomers: dashboardCustomersReducer,
  timeTrack: timeTrackReducer,
  dashboardTasks: dashboardTasksReducer,
  userComponents: userComponentsReducer,
});
