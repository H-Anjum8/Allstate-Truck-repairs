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

export const services = [
  { title: 'Brake Service', time: '1 hr. Estimated Time', price: 89 },
  { title: 'Tire Replacement', time: '1 hr. Estimated Time', price: 99 },
  { title: 'Oil Change', time: '30 min. Estimated Time', price: 69 },
  { title: 'Suspension Check', time: '90 min. Estimated Time', price: 120 },
];
export const reviews = [
  {
    name: 'Mike J.',
    date: '9 July 2025',
    review:
      'Stuck on I-55 with a flat tire. Doug’s team reached me in under 30 minutes! Super professional and had me rolling fast. 10/10 service.',
    rating: 4,
    image: IMAGES.USER1,
  },
  {
    name: 'Carlos M.',
    date: '9 July 2025',
    review:
      'Booked an oil change + safety check before a long haul. Service was smooth, just wish they had a shaded rest spot while I waited.',
    rating: 5,
    image: IMAGES.USER2,
  },
  {
    name: 'Ravi D.',
    date: '9 July 2025',
    review:
      'The mechanic not only fixed the issue but also showed me how to avoid it in future. Real pros, not just parts changers!',
    rating: 5,
    image: IMAGES.USER3,
  },
];

export const menuItems = [
  {
    title: 'Personal Information',
    icon: 'person-outline',
    nav_link: 'personal_info',
  },
  {
    title: 'Subscription Plan',
    icon: 'card-outline',
    nav_link: 'subscription_plan',
  },
  {
    title: 'Change Password',
    icon: 'key-outline',
    nav_link: 'change_password',
  },
  {
    title: 'Privacy Policy',
    icon: 'shield-checkmark-outline',
    nav_link: 'privacy_policy',
  },
  {
    title: 'Terms & Conditions',
    icon: 'document-text-outline',
    nav_link: 'terms_conditions',
  },
  {
    title: 'Contact Support',
    icon: 'headset-outline',
    nav_link: 'contact_support',
  },
  {
    title: 'Delete Account',
    icon: 'trash-outline',
    nav_link: 'delete_account_screen',
  },
];

export const methods = [
  { key: 'card', label: 'Debit / Credit Card' },
  { key: 'paypal', label: 'PayPal' },
  { key: 'wallet', label: 'Mobile Wallet (Apple Pay, Google Pay)' },
];

export const garageservices = [
  { name: 'Tire Replacement & Rotation', price: 99 },
  { name: 'Oil Change', price: 69 },
  { name: 'Suspension Check', price: 120 },
];

export const initialServices = [
  {
    id: 1,
    title: 'Tire Replacement & Rotation',
    description: 'Certified tire change with on-spot wheel rotation.',
    price: 99,
    time: '1 hr. Estimated Time',
    added: true,
  },
  {
    id: 2,
    title: 'Brake Service',
    description: 'Quick pad replacement for smoother and safer braking.',
    price: 89,
    time: '1 hr. Estimated Time',
    added: false,
  },
  {
    id: 3,
    title: 'Oil Change',
    description: 'Fast oil and filter change for better engine health.',
    price: 69,
    time: '30 min. Estimated Time',
    added: true,
  },
  {
    id: 4,
    title: 'Suspension Check',
    description: 'Check shocks and springs for ride comfort and stability.',
    price: 120,
    time: '90 min. Estimated Time',
    added: true,
  },
];
