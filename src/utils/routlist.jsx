import BottomNavigation from '../navigation/BottomNavigation';
import ForgotPassword from '../screens/Auth/ForgotPasswordScreens/ForgotPassword';
import VerifyOTP from '../screens/Auth/ForgotPasswordScreens/VerifyOTP';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import SignupOTPVerify from '../screens/Auth/SignupOTPVerify';
import UploadProfileImage from '../screens/Auth/UploadProfileImage';
import Home from '../screens/Home';
import IntroductionScreen from '../screens/IntroductionScreen';
import SplashScreen from '../screens/SplashScreen';
import { ICONS } from './appAssets';
import Fleet from '../screens/Home/ManagerScreens/Fleet';
// import MyJobs from '../screens/Home/DriverScreens/MyJobs';
import RoleSelection from '../screens/RoleSelection';
import UpdateEmail from '../screens/Auth/UpdateEmail';
import ResetPassword from '../screens/Auth/ForgotPasswordScreens/ResetPassword';
import ProfileSetup from '../screens/Auth/ProfileSetup';
import SignupDone from '../screens/Auth/SignupDone';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import Payment from '../screens/SubscriptionScreen/Payment';
import SubcriptionDone from '../screens/SubscriptionScreen/SubcriptionDone';
import GarageDetails from '../screens/Home/CommonScreens/GarageDetails';
import ServiceSelection from '../screens/Home/CommonScreens/ServiceSelection';
import BookingDone from '../screens/Home/HomeScreens/BookingDone';
import CardDetails from '../screens/Home/HomeScreens/CardDetails';
import PaymentMethod from '../screens/Home/HomeScreens/PaymentMethod';
import RequestBooking from '../screens/Home/HomeScreens/RequestBooking';
import BookingDetails from '../screens/Home/HomeScreens/BookingDetails';
import ConfirmBooking from '../screens/Home/HomeScreens/ConfirmBooking';
import Setting from '../screens/Home/CommonScreens/SettingScreens/Setting';
import PersonalInfo from '../screens/Home/CommonScreens/SettingScreens/PersonalInfo';
import ContactSupport from '../screens/Home/CommonScreens/SettingScreens/ContactSupport';
import SubscriptionPlan from '../screens/Home/CommonScreens/SettingScreens/SubscriptionPlan';
import TermsAndConditions from '../screens/Home/CommonScreens/SettingScreens/TermsAndConditions';
import PrivacyPolicy from '../screens/Home/CommonScreens/SettingScreens/PrivacyPolicy';
import ChangePassword from '../screens/Home/CommonScreens/SettingScreens/ChangePassword';
import EditProfile from '../screens/Home/CommonScreens/SettingScreens/EditProfile';
import FilterScreen from '../screens/Home/CommonScreens/FilterScreen';
import FilterResultScreen from '../screens/Home/CommonScreens/FilterResultScreen';
import MyBookings from '../screens/Home/HomeScreens/MyBookingScreens/MyBookings';
import MyBookingDetails from '../screens/Home/HomeScreens/MyBookingScreens/MyBookingDetails';
import MyBookingCompleted from '../screens/Home/HomeScreens/MyBookingScreens/MyBookingCompleted';
import PastBookingCompleted from '../screens/Home/HomeScreens/MyBookingScreens/PastBookingCompleted';
import PastBookingCanceled from '../screens/Home/HomeScreens/MyBookingScreens/PastBookingCanceled';
import Bookings from '../screens/Home/ManagerScreens/Bookings';
import Messages from '../screens/Home/CommonScreens/MessagesScreens/Messages';
import EmergencyServices from '../screens/Home/HomeScreens/EmergencyServices';
import EmergencyServiceBooking from '../screens/Home/HomeScreens/EmergencyServices/EmergencyServiceBooking';
import CategoriesScreen from '../screens/Home/HomeScreens/MapViewScreen/CategoriesScreen';
import AddStopsScreen from '../screens/Home/HomeScreens/MapViewScreen/AddStopsScreen';
import AddGaragesScreen from '../screens/Home/HomeScreens/MapViewScreen/AddGaragesScreen';

const Routes = {
  Splash: {
    name: 'splash_screen',
    component: SplashScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  IntroductionScreen: {
    name: 'introduction',
    component: IntroductionScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  RoleSelection: {
    name: 'role_selection',
    component: RoleSelection,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  Login: {
    name: 'login_screen',
    component: Login,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ForgotPassword: {
    name: 'forgot_password',
    component: ForgotPassword,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  VerifyOTP: {
    name: 'verify_otp',
    component: VerifyOTP,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  Signup: {
    name: 'signup',
    component: Signup,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  SignupOTPVerify: {
    name: 'signup_otp_verify',
    component: SignupOTPVerify,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  UpdateEmail: {
    name: 'update_email',
    component: UpdateEmail,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ResetPassword: {
    name: 'reset_password',
    component: ResetPassword,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  UploadProfileImage: {
    name: 'upload_profile_image',
    component: UploadProfileImage,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ProfileSetup: {
    name: 'profile_setup',
    component: ProfileSetup,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  SignupDone: {
    name: 'signup_done',
    component: SignupDone,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  SubscriptionScreen: {
    name: 'subscription',
    component: SubscriptionScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  Payment: {
    name: 'payment',
    component: Payment,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  SubcriptionDone: {
    name: 'subcription_done',
    component: SubcriptionDone,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  // dashboard Screens
  Dashboard: {
    name: 'dashboard',
    component: BottomNavigation,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  FilterScreen: {
    name: 'filter_screen',
    component: FilterScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  FilterResultScreen: {
    name: 'filter_result',
    component: FilterResultScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  GarageDtails: {
    name: 'garage_details',
    component: GarageDetails,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ServiceSelection: {
    name: 'service_selection',
    component: ServiceSelection,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  BookingDetails: {
    name: 'booking_details',
    component: BookingDetails,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ConfirmBooking: {
    name: 'confirm_booking',
    component: ConfirmBooking,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  RequestBooking: {
    name: 'request_booking',
    component: RequestBooking,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  PaymentMethod: {
    name: 'payment_method',
    component: PaymentMethod,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  CardDetails: {
    name: 'card_details',
    component: CardDetails,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  BookingDone: {
    name: 'booking_done',
    component: BookingDone,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  MyBookings: {
    name: 'my_bookings',
    component: MyBookings,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  // MyBookings Screens
  MyBookingDetails: {
    name: 'my_booking_details',
    component: MyBookingDetails,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  MyBookingCompleted: {
    name: 'my_booking_completed',
    component: MyBookingCompleted,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  PastBookingCompleted: {
    name: 'past_booking_completed',
    component: PastBookingCompleted,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  PastBookingCanceled: {
    name: 'past_booking_canceled',
    component: PastBookingCanceled,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },

  // Settings Screens

  EditProfile: {
    name: 'edit_profile',
    component: EditProfile,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  PersonalInfo: {
    name: 'personal_info',
    component: PersonalInfo,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ContactSupport: {
    name: 'contact_support',
    component: ContactSupport,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  SubscriptionPlan: {
    name: 'subscription_plan',
    component: SubscriptionPlan,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  TermsAndConditions: {
    name: 'terms_conditions',
    component: TermsAndConditions,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  PrivacyPolicy: {
    name: 'privacy_policy',
    component: PrivacyPolicy,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  ChangePassword: {
    name: 'change_password',
    component: ChangePassword,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  // emergency screens
  EmergencyServices: {
    name: 'emergency_services',
    component: EmergencyServices,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  EmergencyServiceBooking: {
    name: 'emergency_booking',
    component: EmergencyServiceBooking,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  CategoriesScreen: {
    name: 'categories_screen',
    component: CategoriesScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  AddStopsScreen: {
    name: 'addStops_screen',
    component: AddStopsScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
  AddGaragesScreen: {
    name: 'addGarages_screen',
    component: AddGaragesScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: false,
  },
};
export const BOTTOM_ROUTES_USER = [
  {
    name: 'home',
    component: Home,
    icon: ICONS.HOME,
    label: 'Home',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'messages',
    component: Messages,
    icon: ICONS.MESSAGES,
    label: 'Messages',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'my_bookings',
    component: MyBookings,
    icon: ICONS.BOOKING,
    label: 'Bookings',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'fleet',
    component: Fleet,
    icon: ICONS.FLEET,
    label: 'Fleet',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'setting',
    component: Setting,
    icon: ICONS.SETTING,
    label: 'Setting',
    options: { headerShown: false, gestureEnabled: false },
  },
];

export const BOTTOM_ROUTES_MANAGER = [
  {
    name: 'home',
    component: Home,
    icon: ICONS.HOME,
    label: 'Home',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'bookings',
    component: Bookings,
    icon: ICONS.BOOKING,
    label: 'Bookings',
    options: { headerShown: false, gestureEnabled: false },
  },
  // {
  //   name: 'fleet',
  //   component: Fleet,
  //   icon: ICONS.FLEET,
  //   label: 'Fleet',
  //   options: { headerShown: false, gestureEnabled: false },
  // },
  {
    name: 'setting',
    component: Setting,
    icon: ICONS.SETTING,
    label: 'Setting',
    options: { headerShown: false, gestureEnabled: false },
  },
];

// export const BOTTOM_ROUTES_DRIVER = [
//   {
//     name: 'home',
//     component: Home,
//     icon: ICONS.HOME,
//     label: 'Home',
//     options: { headerShown: false, gestureEnabled: false },
//   },
//   {
//     name: 'jobs',
//     component: MyJobs,
//     icon: ICONS.JOBS,
//     label: 'My Jobs',
//     options: { headerShown: false, gestureEnabled: false },
//   },

//   {
//     name: 'setting',
//     component: Setting,
//     icon: ICONS.SETTING,
//     label: 'Setting',
//     options: { headerShown: false, gestureEnabled: false },
//   },
// ];

export const getAuthScreens = () => {
  return Object.values(Routes).filter(route => !route.authRequired);
};

export const getProtectedScreens = () => {
  return Object.values(Routes).filter(route => route.authRequired);
};

export default Routes;
