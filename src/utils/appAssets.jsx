const images = {
  SPLASH_SCREEN: require('../assets/splash_screen.png'),
};

const icons = {
  HOME: {
    active: require('../assets/bottomIcons/home_active.png'),
    inactive: require('../assets/bottomIcons/home_inactive.png'),
  },
  BOOKING: {
    active: require('../assets/bottomIcons/booking_active.png'),
    inactive: require('../assets/bottomIcons/booking_inactive.png'),
  },
  SETTING: {
    active: require('../assets/bottomIcons/setting_active.png'),
    inactive: require('../assets/bottomIcons/setting_inactive.png'),
  },
  FLEET: {
    active: require('../assets/bottomIcons/fleet_active.png'),
    inactive: require('../assets/bottomIcons/fleet_inactive.png'),
  },
  JOBS: {
    active: require('../assets/bottomIcons/jobs_active.png'),
    inactive: require('../assets/bottomIcons/jobs_inactive.png'),
  },
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
