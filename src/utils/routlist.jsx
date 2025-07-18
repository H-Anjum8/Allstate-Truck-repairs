import BottomNavigation from '../navigation/BottomNavigation';
import ForgotPassword from '../screens/Auth/ForgotPasswordScreens/ForgotPassword';
import VerifyOTP from '../screens/Auth/ForgotPasswordScreens/VerifyOTP';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import SignupDone from '../screens/Auth/SignupDone';
import SignupOTPVerify from '../screens/Auth/SignupOTPVerify';
import UploadProfileImage from '../screens/Auth/UploadProfileImage';
import Home from '../screens/Home';
import Booking from '../screens/Home/CommonScreens/Booking';
import IntroductionScreen from '../screens/IntroductionScreen';
import SplashScreen from '../screens/SplashScreen';
import { ICONS } from './appAssets';
import Setting from '../screens/Home/CommonScreens/Setting';
import Fleet from '../screens/Home/ManagerScreens/Fleet';
import MyJobs from '../screens/Home/DriverScreens/MyJobs';

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
  UploadProfileImage: {
    name: 'upload_profile_image',
    component: UploadProfileImage,
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
  Dashboard: {
    name: 'dashboard',
    component: BottomNavigation,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    authRequired: true,
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
    name: 'booking',
    component: Booking,
    icon: ICONS.BOOKING,
    label: 'Booking',
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
    name: 'booking',
    component: Booking,
    icon: ICONS.BOOKING,
    label: 'Booking',
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

export const BOTTOM_ROUTES_DRIVER = [
  {
    name: 'home',
    component: Home,
    icon: ICONS.HOME,
    label: 'Home',
    options: { headerShown: false, gestureEnabled: false },
  },
  {
    name: 'jobs',
    component: MyJobs,
    icon: ICONS.JOBS,
    label: 'My Jobs',
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

export const getAuthScreens = () => {
  return Object.values(Routes).filter(route => !route.authRequired);
};

export const getProtectedScreens = () => {
  return Object.values(Routes).filter(route => route.authRequired);
};

export default Routes;
