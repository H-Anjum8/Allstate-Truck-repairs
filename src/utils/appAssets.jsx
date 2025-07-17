// src/assets/index.js

// Import all your image assets
const images = {
  // Logos
  LOGO: require('../assets/logo.png'),
  TXT_LOGO: require('../assets/text_logo.png'),
  LOGO_WHITE: require('../assets/logo.png'),

  // Onboarding/Welcome screens
  BG_IMAGE: require('../assets/bg_image.png'),
  BG_DUMMY_IMG: require('../assets/image.png'),
  SERVICE_DETAIL_IMG: require('../assets/service_detail_img.png'),
  // ONBOARDING_1: require('./images/onboarding_1.png'),
  // ONBOARDING_2: require('./images/onboarding_2.png'),
  // ONBOARDING_3: require('./images/onboarding_3.png'),

  AVATAR_DUMMY_IMG: require('../assets/profile_dummy_img.png'),

  // Placeholders
  AVATAR_PLACEHOLDER: require('../assets/avatar-placeholder.png'),
  IMAGE_PLACEHOLDER: require('../assets/image_placeholder.png'),

  // App specific images
  // SUCCESS: require('./images/success.png'),
  // ERROR: require('./images/error.png'),
  // EMPTY_STATE: require('./images/empty_state.png'),

  // Add more images as needed...
};

// Import all your icon assets (if using custom icons)
const icons = {
  // Navigation icons
  HOME_WHITE: require('../assets/bottomIcons/home.png'),
  EXPLORE_WHITE: require('../assets/bottomIcons/explore.png'),
  PROFILE_WHITE: require('../assets/bottomIcons/profile.png'),
  BOOKING_MESSAGE_WHITE: require('../assets/bottomIcons/booking_message.png'),
  MESSAGE_WHITE: require('../assets/bottomIcons/message.png'),
  CALENDAR_WHITE: require('../assets/bottomIcons/calendar.png'),

  HOME_COLORED: require('../assets/bottomIcons/home_colored.png'),
  EXPLORE_COLORED: require('../assets/bottomIcons/explore_colored.png'),
  PROFILE_COLORED: require('../assets/bottomIcons/profile_colored.png'),
  BOOKING_MESSAGE_COLORED: require('../assets/bottomIcons/booking_message_colored.png'),
  MESSAGE_COLORED: require('../assets/bottomIcons/message_colored.png'),
  CALENDAR_COLORED: require('../assets/bottomIcons/calendar_colored.png'),

  // Action icons
  // ADD: require('./icons/add.png'),
  // DELETE: require('./icons/delete.png'),
  // EDIT: require('./icons/edit.png'),
  // SEARCH: require('./icons/search.png'),
  // FILTER: require('./icons/filter.png'),

  // // Status icons
  // SUCCESS: require('./icons/success.png'),
  // WARNING: require('./icons/warning.png'),
  // ERROR: require('./icons/error.png'),
  // INFO: require('./icons/info.png'),

  // // Social icons
  // FACEBOOK: require('./icons/facebook.png'),
  // GOOGLE: require('./icons/google.png'),
  // TWITTER: require('./icons/twitter.png'),

  POSTS_TAB: require('../assets/posts_tab_icon.png'),
  SERVICES_TAB: require('../assets/services_tab_icon.png'),
  SEND: require('../assets/send.png'),
  DOWNLOAD: require('../assets/download_icon.png'),
  EDIT: require('../assets/edit.png'),
  PROFILE: require('../assets/profile.png'),
  ACCOUNT: require('../assets/account.png'),
  PAST_SUMMARIES: require('../assets/past_summries.png'),
  LIKED: require('../assets/liked.png'),
  FOLLOWING: require('../assets/following.png'),
  PRIVACY_POLICY: require('../assets/privacy_policy.png'),
  TERMS_CONDITION: require('../assets/terms_condition.png'),
  MODE: require('../assets/mode.png'),
  CONTACT_SUPPORT: require('../assets/contact_support.png'),
  NOTIFICATION: require('../assets/notification.png'),
  LOGOUT: require('../assets/logout.png')

  // Add more icons as needed...
};

// Export assets
export const IMAGES = images;
export const ICONS = {
  ...icons,
};

export default {
  IMAGES,
  ICONS,
};
