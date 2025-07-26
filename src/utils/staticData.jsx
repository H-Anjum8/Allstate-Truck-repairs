import { ICONS, IMAGES } from './appAssets';

export const splashData = [
  {
    title: 'Truck Trouble? Help is Just a Tap Away',
    description:
      'Whether it’s a breakdown or routine maintenance, find trusted mechanics and assistance nearby in minutes – anytime, anywhere.',
    button: 'Next',
    image: IMAGES.RED_SEMITRUCK,
  },
  {
    title: 'Mechanics You Can Trust',
    description:
      'We connect you with experienced, verified service providers who specialize in repairs, towing, diagnostics, and more.',
    button: 'Next',
    image: IMAGES.FRIENDLY_MECHANIC,
  },
  {
    title: 'Your Journey Starts Here',
    description:
      'Whether you’re a driver needing roadside help or a mechanic offering repair services – this app is built for you.',
    button: 'Get Started',
    image: IMAGES.TWO_CHARACTERS,
  },
];

export const featured = [
  {
    name: "Doug's Garage",
    garage_logo: IMAGES.GARAGE_LOGO,
    authentic_icon: ICONS.VERIFY,
    rating: '4.9',
    address:
      'Doug’s Roadside Garage offers fast, reliable, and certified roadside repair services for commercial trucks and trailers.',
    location: '456 Repair Lane, Springfield, IL',
  },
  {
    name: "Doug's Garage",
    garage_logo: IMAGES.GARAGE_LOGO,
    authentic_icon: ICONS.AUTHENTIC_ICON,
    rating: '4.9',
    address:
      'Doug’s Roadside Garage offers fast, reliable, and certified roadside repair services for commercial trucks and trailers.',
    location: '456 Repair Lane, Springfield, IL',
  },
];

export const categories = [
  { icon: IMAGES.TIRE, title: 'Tire Repair' },
  { icon: IMAGES.BRAKE, title: 'Brake Service' },
  { icon: IMAGES.BATTERY, title: 'Battery Jumpstart' },
  { icon: IMAGES.CLUTCH, title: 'Clutch Repair' },
];

export const plans = [
  {
    id: '1',
    title: 'Free Plan',
    price: '',
    description: 'Good for individuals \n with limited needs',
  },
  {
    id: '2',
    title: 'Pro Driver',
    price: '$24.99',
    discount: 'Save 20%',
  },
  {
    id: '3',
    title: 'Fleet Pro',
    price: '$49.99',
    discount: 'Save 15%',
  },
];

export const allBenefits = [
  'View nearby mechanics',
  'Book appointments',
  'Promotions / discounts access',
  'Priority bookings',
  'Driver Management',
  'Vehicle registration',
  'Centralized fleet dashboard',
  'Customer support priority',
];

export const vehicleTypes = [
  { label: 'Truck', value: 'truck' },
  { label: 'Car', value: 'car' },
  { label: 'Motorcycle', value: 'motorcycle' },
];

export const locations = [
  { label: 'Lahore', value: 'lahore' },
  { label: 'Karachi', value: 'karachi' },
  { label: 'Islamabad', value: 'islamabad' },
];
