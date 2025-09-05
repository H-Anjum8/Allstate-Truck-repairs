import { ICONS, IMAGES } from './appAssets';

export const INTRO_DATA = [
  {
    title: 'Assistance at Your Fingertips',
    description:
      'No matter the problem, discover reliable service providers near your location in real time ready to help when you need it most.',
    button: 'Next',
    image: IMAGES.INTRO_IMG_1,
  },
  {
    title: 'Manage Your Fleet with Ease',
    description:
      'Keep track of all your vehicles, drivers, and bookings in one simple dashboard. Add, edit, or view details instantly to stay on top of operations.',
    button: 'Next',
    image: IMAGES.INTRO_IMG_2,
  },
  {
    title: 'Your Business, Simplified',
    description:
      'Monitor bookings, earnings, and ratings in real time. Manage your work seamlessly and grow with confidence.',
    button: 'Get Started',
    image: IMAGES.INTRO_IMG_3,
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
  {
    title: 'Battery Jumpstart',
    time: '1 hr. Estimated Time',
    price: '89',
    originalPrice: '99',
    discounted: true,
  },
  {
    title: 'Tire Replacement',
    time: '1 hr. Estimated Time',
    price: '99',
    originalPrice: '109',
    discounted: true,
  },
  {
    title: 'Oil Change',
    time: '30 min. Estimated Time',
    price: '69',
    originalPrice: '79',
    discounted: false,
  },
  {
    title: 'Suspension Check',
    time: '90 min. Estimated Time',
    price: '120',
    discounted: true, // or just omit originalPrice
  },
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
  { id: 1, name: 'Tire Replacement & Rotation', price: 99 },
  { id: 2, name: 'Oil Change', price: 69 },
  { id: 3, name: 'Suspension Check', price: 120 },
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
export const fleetbooking = [
  {
    id: '1',
    status: 'Confirmed',
    name: 'Doug’s Roadside Garage',
    address: '456 Repair Lane, Springfield, IL',
    amount: '$288',
    type: 'upcoming',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: 'Work Status',
    Status: 'In Progress',
    date: '2025-08-27',
  },
  {
    id: '2',
    status: 'Pending',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'upcoming',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: '',
    Status: '',
    date: '2025-08-29',
  },
  {
    id: '3',
    status: 'Completed',
    name: 'TorqueLine Garage',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'past',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: 'Finished',
    Status: 'Completed',
    date: '2025-08-20',
  },
  {
    id: '4',
    status: 'Canceled',
    name: 'TorqueLine Garage',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'past',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: 'N/A',
    Status: 'Canceled',
    date: '2025-08-18',
  },
  {
    id: '5',
    status: 'Confirmed',
    name: 'Doug’s Roadside Garage',
    address: '456 Repair Lane, Springfield, IL',
    amount: '$288',
    type: 'upcoming',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: 'Work Status',
    Status: 'Scheduled',
    date: '2025-09-01',
  },
  {
    id: '6',
    status: 'Pending',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'upcoming',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: '',
    Status: 'Not Started',
    date: '2025-09-03',
  },
  {
    id: '7',
    status: 'Canceled',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$105',
    type: 'past',
    vehicle: 'Freightliner TX-9821',
    username: 'George Franklin',
    workStatus: 'N/A',
    Status: 'Canceled',
    date: '2025-08-10',
  },
];

export const additional_services = [
  {
    id: '1',
    provider: 'Doug’s Roadside Garage',
    title: 'Suspension Alignment',
    price: '$89',
    description:
      'Complete suspension alignment suggested by provider for better stability and smooth driving experience.',
  },
];
export const fleetCancelDummy = {
  id: '12345',
  garage: {
    name: 'Doug’s Roadside Garage',
    logo: IMAGES.GARAGE_LOGO,
    status: 'Cancelled',
  },
  vehicle: {
    name: 'Freightliner TX-9821',
    licensePlate: 'ABC-1234',
    status: 'Active',
    year: '2020',
  },
  driver: {
    name: 'George Franklin',
    image: IMAGES.USER7,
    phone: '+1 234 567 890',
    email: 'George@gmail.com',
  },
  workStatus: 'Cancelled',
  services: [
    {
      title: 'Tire Replacement & Rotation',
      time: '10:00 AM - 12:30 PM',
      price: '$99',
    },
    { title: 'Oil Change', time: '03:00 AM - 03:30 PM', price: '$69' },
    { title: 'Suspension Check', time: '05:00 AM - 06:30 PM', price: '$120' },
  ],
  overview: {
    totalServices: 3,
    reservationFee: '$35',
    remainingDue: '$253',
    tax: '$16',
    subtotal: '$304',
    reservationPaid: '$35',
    remainingDueFinal: '$259',
  },
};

export const booking = [
  {
    id: '1',
    status: 'Confirmed',
    name: 'Doug’s Roadside Garage',
    address: '456 Repair Lane, Springfield, IL',
    amount: '$288',
    type: 'upcoming',
  },
  {
    id: '2',
    status: 'Pending',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'upcoming',
  },
  {
    id: '3',
    status: 'Completed',
    name: 'TorqueLine Garage',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'past',
  },
  {
    id: '4',
    status: 'Canceled',
    name: 'TorqueLine Garage',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'past',
  },
  {
    id: '5',
    status: 'Confirmed',
    name: 'Doug’s Roadside Garage',
    address: '456 Repair Lane, Springfield, IL',
    amount: '$288',
    type: 'upcoming',
  },
  {
    id: '6',
    status: 'Pending',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$135',
    type: 'upcoming',
  },
  {
    id: '7',
    status: 'Canceled',
    name: 'QuickFix Auto Hub',
    address: 'City Diesel Experts – Dallas, TX',
    amount: '$105',
    type: 'past',
  },
];

export const slotData = {
  '2025-07-10': [],
  '2025-07-11': {
    1: ['10:00 AM - 12:30 PM', '01:00 PM - 02:30 PM'],
    2: ['03:00 PM - 03:30 PM', '04:00 PM - 04:30 PM'],
    3: ['05:00 PM - 06:30 PM', '07:00 PM - 08:30 PM'],
  },
};

export const serviceTypes = [
  'Oil Change',
  'Brake Pad Replacement',
  'Battery Jumpstart',
  'Suspension Check',
  'Tire Replacement',
];

export const filterTags = [
  'Oil Change',
  'Battery Jumpstart',
  'Tire Replacement',
  'Smog Check',
  'Brake Inspection',
];

export const all_services = [
  { name: 'Fuel Station', icon: ICONS.FUEL_STATION },
  { name: 'Repair', icon: ICONS.REPAIR },
  { name: 'Parking', icon: ICONS.PARKING },
  { name: 'Truck Stop', icon: ICONS.TRUCK },
  { name: 'More', icon: ICONS.MORE },
];

export const dummyWeather = {
  current: { temp: 29, icon: 'sunny' },
  hourly: [
    { id: '1', time: 'Now', temp: 29, icon: 'sunny' },
    { id: '2', time: '1 PM', temp: 29, icon: 'sunny' },
    { id: '3', time: '2 PM', temp: 29, icon: 'sunny' },
    { id: '4', time: '3 PM', temp: 29, icon: 'sunny' },
    { id: '5', time: '4 PM', temp: 29, icon: 'sunny' },
  ],
};
