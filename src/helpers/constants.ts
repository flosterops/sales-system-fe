import {
  faChevronRight,
  faEnvelope,
  faUnlockAlt,
  faSearch,
  faUser,
  faChevronDown,
  faTachometerAlt,
  faFile,
  faList,
  faUsers,
  faCar,
  faUserCog,
  faSignOutAlt,
  faPauseCircle,
  faCheck,
  faChevronLeft,
  faMapMarkerAlt,
  faPhoneAlt,
  faPhoneSquareAlt,
  faComment,
  faExclamationCircle,
  faPencilAlt,
  faTimes,
  faCoffee,
  faStickyNote,
  faPaperclip,
  faArrowRight,
  faPoundSign,
  faShieldAlt,
  faUmbrella,
  faClipboardCheck,
  faSortUp,
  faSort,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock,
  faSmile,
  faPaperPlane,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

import { EIconTypes } from 'models/icons';
import { EPageComponentTypes } from 'models/route';
import { VehicleDetailsPage } from 'pages/VehicleDetailsPage';
import { DashboardPage } from 'pages/DashboardPage';
import { ProfilePage } from 'pages/ProfilePage';
import { TasksQueuePage } from 'pages/TasksQueuePage';
import { EnquiriesPage } from 'pages/EnquiriesPage';
import { VehiclesPage } from 'pages/VehiclesPage';
import { TaskPage } from 'pages/TaskPage';
import { FinishedTasksPage } from 'pages/FinishedTasksPage';
import { CustomersPage } from 'pages/CustomersPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { CustomerDetailsPage } from 'pages/CustomerDetailsPage';
import { BreakListPage } from 'pages/BreakListPage';
import { AddOrderPage } from 'pages/AddOrderPage';
import { SearchPage } from 'pages/SearchPage';
import { TokenPage } from '../pages/TokenPage';

export const icons = {
  [EIconTypes.email]: faEnvelope,
  [EIconTypes.password]: faUnlockAlt,
  [EIconTypes.rightChevron]: faChevronRight,
  [EIconTypes.leftChevron]: faChevronLeft,
  [EIconTypes.downChevron]: faChevronDown,
  [EIconTypes.search]: faSearch,
  [EIconTypes.account]: faUser,
  [EIconTypes.tachometer]: faTachometerAlt,
  [EIconTypes.file]: faFile,
  [EIconTypes.list]: faList,
  [EIconTypes.users]: faUsers,
  [EIconTypes.car]: faCar,
  [EIconTypes.userSettings]: faUserCog,
  [EIconTypes.signOut]: faSignOutAlt,
  [EIconTypes.pauseCircle]: faPauseCircle,
  [EIconTypes.clock]: faClock,
  [EIconTypes.smile]: faSmile,
  [EIconTypes.check]: faCheck,
  [EIconTypes.mapMarkerAlt]: faMapMarkerAlt,
  [EIconTypes.phoneAlt]: faPhoneAlt,
  [EIconTypes.phoneSquareAlt]: faPhoneSquareAlt,
  [EIconTypes.comment]: faComment,
  [EIconTypes.exclamationCircle]: faExclamationCircle,
  [EIconTypes.pencilAlt]: faPencilAlt,
  [EIconTypes.times]: faTimes,
  [EIconTypes.arrowRight]: faArrowRight,
  [EIconTypes.poundSign]: faPoundSign,
  [EIconTypes.shieldAlt]: faShieldAlt,
  [EIconTypes.umbrella]: faUmbrella,
  [EIconTypes.clipboardCheck]: faClipboardCheck,
  [EIconTypes.coffee]: faCoffee,
  [EIconTypes.paperPlane]: faPaperPlane,
  [EIconTypes.stickyNote]: faStickyNote,
  [EIconTypes.paperClip]: faPaperclip,
  [EIconTypes.sort]: faSort,
  [EIconTypes.sortUp]: faSortUp,
  [EIconTypes.sortDown]: faSortDown,
  [EIconTypes.questionCircle]: faQuestionCircle,
};

export const pageComponentTypes = {
  [EPageComponentTypes.DashboardPage]: DashboardPage,
  [EPageComponentTypes.ProfilePage]: ProfilePage,
  [EPageComponentTypes.VehicleDetailsPage]: VehicleDetailsPage,
  [EPageComponentTypes.TasksQueuePage]: TasksQueuePage,
  [EPageComponentTypes.EnquiriesPage]: EnquiriesPage,
  [EPageComponentTypes.TaskPage]: TaskPage,
  [EPageComponentTypes.VehiclesPage]: VehiclesPage,
  [EPageComponentTypes.FinishedTasksPage]: FinishedTasksPage,
  [EPageComponentTypes.AddOrderPage]: AddOrderPage,
  [EPageComponentTypes.CustomersPage]: CustomersPage,
  [EPageComponentTypes.NotFoundPage]: NotFoundPage,
  [EPageComponentTypes.CustomerDetailsPage]: CustomerDetailsPage,
  [EPageComponentTypes.BreakListPage]: BreakListPage,
  [EPageComponentTypes.SearchPage]: SearchPage,
  [EPageComponentTypes.TokenPage]: TokenPage,
};
