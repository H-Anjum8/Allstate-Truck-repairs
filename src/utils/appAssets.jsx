const images = {
  SPLASH_SCREEN: require('../assets/splash_screen.png'),
  TIRE: require('../assets/tire.png'),
  BRAKE: require('../assets/brake.png'),
  BATTERY: require('../assets/battery.png'),
  CLUTCH: require('../assets/clutch.png'),
  RED_SEMITRUCK: require('../assets/red-semitruck.png'),
  FRIENDLY_MECHANIC: require('../assets/friendly-mechanic.png'),
  TWO_CHARACTERS: require('../assets/two-characters.png'),
  GARAGE_LOGO: require('../assets/garage-logo.png'),
  MACHANIC: require('../assets/machanic.png'),
  OWNER: require('../assets/owner.png'),
  PROFILE: require('../assets/profile.jpg'),
  GARAGE_LOGO: require('../assets/garage-logo.png'),
  HEADER_BG: require('../assets/headerBackground.png'),
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
  LOCATION_COLOURED: require('../assets/icons/location-colored.png'),
  TICK: require('../assets/icons/tick.png'),
  VERIFY: require('../assets/icons/verify.png'),
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
