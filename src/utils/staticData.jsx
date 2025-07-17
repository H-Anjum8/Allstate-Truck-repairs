import {IMAGES} from './appAssets';

// Gender options for dropdown
export const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

// src/data/categories.js

const categories = [
  {
    _id: '1',
    title: 'Tarot Reader',
    image: 'https://example.com/images/categories/tarot_reader.png',
  },
  {
    _id: '2',
    title: 'Astrology',
    image: 'https://example.com/images/categories/astrology.png',
  },
  {
    _id: '3',
    title: 'Numerology',
    image: 'https://example.com/images/categories/numerology.png',
  },
  {
    _id: '4',
    title: 'Palmistry',
    image: 'https://example.com/images/categories/palmistry.png',
  },
  {
    _id: '5',
    title: 'Angel Card',
    image: 'https://example.com/images/categories/angel_card.png',
  },
  {
    _id: '6',
    title: 'Energy Healer',
    image: 'https://example.com/images/categories/energy_healer.png',
  },
  {
    _id: '7',
    title: 'Sound Healer',
    image: 'https://example.com/images/categories/sound_healer.png',
  },
  {
    _id: '8',
    title: 'Vedic Astrologer',
    image: 'https://example.com/images/categories/vedic_astrologer.png',
  },
  {
    _id: '9',
    title: 'Crystal Healer',
    image: 'https://example.com/images/categories/crystal_healer.png',
  },
  {
    _id: '10',
    title: 'Intuitive Reader',
    image: 'https://example.com/images/categories/intuitive_reader.png',
  },
  {
    _id: '11',
    title: 'Aura Reader',
    image: 'https://example.com/images/categories/aura_reader.png',
  },
  {
    _id: '12',
    title: 'Dream Interpreter',
    image: 'https://example.com/images/categories/dream_interpreter.png',
  },
  {
    _id: '13',
    title: 'Spiritual Coach',
    image: 'https://example.com/images/categories/spiritual_coach.png',
  },
  {
    _id: '14',
    title: 'Reiki Practitioner',
    image: 'https://example.com/images/categories/reiki_practitioner.png',
  },
  {
    _id: '15',
    title: 'Palm Reader',
    image: 'https://example.com/images/categories/palm_reader.png',
  },
  {
    _id: '16',
    title: 'Pendulum Reader',
    image: 'https://example.com/images/categories/pendulum_reader.png',
  },
];

export default categories;

//   Duration options
export const durationOptions = [
  {label: '10 Min', value: '10'},
  {label: '20 Min', value: '20'},
  {label: '30 Min', value: '30'},
];

// Sample data for posts with emoji reactions
export const DUMMY_POSTS = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Mr. Dana Somerville',
      avatar: IMAGES.AVATAR_DUMMY_IMG,
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Quis commodo sit sagittis diam turpis vestibulum placerat tellus id eget purus.',
    image: IMAGES.BG_DUMMY_IMG,
    likes: 254,
    reactions: [
      {type: 'like', count: 120},
      {type: 'love', count: 75},
      {type: 'haha', count: 59},
    ],
    timeAgo: '28 Mins ago',
    userReaction: null, // The current user's reaction (if any)
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Mr. Juan Phillips',
      avatar: IMAGES.AVATAR_DUMMY_IMG,
    },
    content:
      "Raising kids is tough, but you don't have to do it alone. Join the conversation with other incredible moms!",
    image: IMAGES.BG_DUMMY_IMG,
    likes: 354,
    reactions: [
      {type: 'like', count: 200},
      {type: 'love', count: 154},
    ],
    timeAgo: '3 hours ago',
    userReaction: null,
  },
  {
    id: '3',
    user: {
      id: 'user2',
      name: 'Mr. Juan Phillips',
      avatar: IMAGES.AVATAR_DUMMY_IMG,
    },
    content:
      "Raising kids is tough, but you don't have to do it alone. Join the conversation with other incredible moms!",
    image: IMAGES.BG_DUMMY_IMG,
    likes: 198,
    reactions: [
      {type: 'like', count: 98},
      {type: 'love', count: 45},
      {type: 'wow', count: 36},
      {type: 'sad', count: 19},
    ],
    timeAgo: '5 hours ago',
    userReaction: null,
  },
];

// Menu options for the three-dots menu
export const POST_MENU_OPTIONS = [
  {label: 'Report Post', icon: 'flag', value: 'report'},
  {label: 'Hide Post', icon: 'eye-off', value: 'hide'},
  {label: 'Copy Link', icon: 'link', value: 'copy-link'},
];

export const EDIT_DELETE_MENU_OPTIONS = [
    {label: 'Edit', icon: 'edit-2', value: 'edit'},
    {label: 'Delete', icon: 'trash-2', value: 'delete'},
  ];

// Reaction emoji definitions
export const REACTIONS = [
  {id: 'like', emoji: '👍', label: 'Like', color: '#0571ED'},
  {id: 'love', emoji: '❤️', label: 'Love', color: '#ED2E5F'},
  {id: 'haha', emoji: '😂', label: 'Haha', color: '#F4C01E'},
  {id: 'wow', emoji: '😲', label: 'Wow', color: '#F4C01E'},
  {id: 'sad', emoji: '😢', label: 'Sad', color: '#F4C01E'},
  {id: 'angry', emoji: '😡', label: 'Angry', color: '#ED6936'},
];


// Sample service data
export const SERVICES_DATA = [
    {
      id: '1',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Mr. Dana Somerville',
      rating: 4.5,
      reviewCount: 355,
      serviceName: 'Tarot Reader',
      serviceDescription:
        'A personalized tarot reading session focusing on love, career, and health, tailored to your specific questions and concerns.',
      price: 50,
      currency: 'USD',
      perUnit: 'hour',
      availabilityText: 'Available Every Tuesday, 9:00 AM to 5:00 PM',
      categories: ['1', '4'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '2',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'John Smith',
      rating: 4.8,
      reviewCount: 210,
      serviceName: 'Astrology Reading',
      serviceDescription:
        'Comprehensive birth chart analysis and future projections based on planetary positions.',
      price: 75,
      currency: 'USD',
      perUnit: 'session',
      availabilityText: 'Available Weekends, 10:00 AM to 8:00 PM',
      categories: ['2', '3'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '3',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Emma Rodriguez',
      rating: 4.7,
      reviewCount: 187,
      serviceName: 'Numerology Consultation',
      serviceDescription:
        'Discover the hidden meanings behind your personal numbers and how they influence your life path and destiny.',
      price: 60,
      currency: 'USD',
      perUnit: 'hour',
      availabilityText: 'Available Monday-Friday, 2:00 PM to 8:00 PM',
      categories: ['3', '13'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '4',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Sarah Johnson',
      rating: 4.9,
      reviewCount: 278,
      serviceName: 'Angel Card Reading',
      serviceDescription:
        'Connect with your guardian angels through a specialized card reading that provides guidance and support for your current life situation.',
      price: 45,
      currency: 'USD',
      perUnit: 'session',
      availabilityText: 'Available Everyday, 9:00 AM to 7:00 PM',
      categories: ['5', '10'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '5',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Michael Chen',
      rating: 4.6,
      reviewCount: 142,
      serviceName: 'Energy Healing',
      serviceDescription:
        'Remote energy healing session to restore balance, release blockages, and promote overall well-being through chakra alignment.',
      price: 65,
      currency: 'USD',
      perUnit: 'hour',
      availabilityText: 'Available Tuesday and Thursday, 11:00 AM to 6:00 PM',
      categories: ['6', '9', '14'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '6',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Jessica Williams',
      rating: 4.4,
      reviewCount: 98,
      serviceName: 'Sound Healing Meditation',
      serviceDescription:
        'Experience deep relaxation and spiritual connection through specially crafted sound frequencies and guided meditation.',
      price: 40,
      currency: 'USD',
      perUnit: 'session',
      availabilityText: 'Available Wednesday and Sunday, 5:00 PM to 9:00 PM',
      categories: ['7', '14'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '7',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Rajesh Patel',
      rating: 4.9,
      reviewCount: 325,
      serviceName: 'Vedic Astrology',
      serviceDescription:
        'Traditional Indian astrological reading using ancient Vedic principles to provide insights into past, present, and future life events.',
      price: 85,
      currency: 'USD',
      perUnit: 'hour',
      availabilityText: 'Available Monday, Wednesday, Friday, 10:00 AM to 8:00 PM',
      categories: ['2', '8'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '8',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Olivia Thompson',
      rating: 4.7,
      reviewCount: 156,
      serviceName: 'Crystal Healing',
      serviceDescription:
        'Personalized crystal therapy session that helps balance energy fields, remove blockages, and promote physical and emotional healing.',
      price: 55,
      currency: 'USD',
      perUnit: 'session',
      availabilityText: 'Available Monday-Saturday, 12:00 PM to 6:00 PM',
      categories: ['6', '9'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '9',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'David Wilson',
      rating: 4.5,
      reviewCount: 112,
      serviceName: 'Dream Interpretation',
      serviceDescription:
        'Unlock the hidden messages in your dreams with expert analysis that connects your subconscious mind to your waking life.',
      price: 45,
      currency: 'USD',
      perUnit: 'hour',
      availabilityText: 'Available Tuesday and Friday, 3:00 PM to 9:00 PM',
      categories: ['12', '10'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
    {
      id: '10',
      image: IMAGES.BG_DUMMY_IMG,
      providerImage: IMAGES.AVATAR_DUMMY_IMG,
      providerName: 'Sophia Martinez',
      rating: 4.8,
      reviewCount: 203,
      serviceName: 'Spiritual Coaching',
      serviceDescription:
        "One-on-one guidance to help you navigate life's challenges, develop spiritual practices, and align with your higher purpose.",
      price: 80,
      currency: 'USD',
      perUnit: 'session',
      availabilityText: 'Available Monday, Wednesday, Friday, 9:00 AM to 5:00 PM',
      categories: ['13', '14'],
      reviews: [
        {
          id: '1',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '15th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '2',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 4,
          date: '12th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
        {
          id: '3',
          userName: 'Jack Daniel',
          userAvatar:IMAGES.AVATAR_DUMMY_IMG,
          rating: 5,
          date: '10th Dec 2023',
          title: 'Good Service',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim...',
        },
      ],
    },
  ];


 export const appointmentsData = [
    {
      id: '1',
      label: 'Appointments',
    },
    {
      id: '2',
      label: 'Booking Requests',
    },
  ];
  

 export const bookingsStatusData = [
    {
      id: '1',
      label: 'Pending',
    },
    {
      id: '2',
      label: 'Approved',
    },
    {
      id: '3',
      label: 'Rejected',
    },
  ];



  // Static Appointments Data - Multiple meetings on same date
  export const appointmentsListData = [
    {
      id: '1',
      date: 'TUE',
      dateNumber: '3',
      fullDate: '2024-05-03',
      time: '11:00 AM - 01:00 PM',
      duration: '(02 Hours Meeting)',
      clientName: 'John Doe',
      serviceName: 'Tarot Reading',
      type: 'Meeting',
      status: 'confirmed',
      link:"https://tarotreading/session/john-doe-tarot"
    },
    {
      id: '2',
      date: 'TUE',
      dateNumber: '3',
      fullDate: '2024-05-03',
      time: '02:00 PM - 03:00 PM',
      duration: '(01 Hours Meeting)',
      clientName: 'John Mobbin',
      serviceName: 'Astrology Consultation',
      type: 'Meeting',
      status: 'confirmed',
      link:"https://tarotreading/session/john-doe-tarot"

    },
    {
      id: '3',
      date: 'WED',
      dateNumber: '4',
      fullDate: '2024-05-04',
      time: '10:00 AM - 12:00 PM',
      duration: '(02 Hours Meeting)',
      clientName: 'Sarah Johnson',
      serviceName: 'Crystal Healing',
      type: 'Meeting',
      status: 'confirmed',
      link:"https://tarotreading/session/john-doe-tarot"

    },
  ];


  // Users List Data - 10 Users
export const USERS_DATA = [
  {
    id: "user_001",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "John",
    last_name: "Doe"
  },
  {
    id: "user_002", 
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Sarah",
    last_name: "Johnson"
  },
  {
    id: "user_003",
    avatar: IMAGES.AVATAR_DUMMY_IMG, 
    first_name: "Michael",
    last_name: "Chen"
  },
  {
    id: "user_004",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Emma",
    last_name: "Rodriguez"
  },
  {
    id: "user_005",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "David",
    last_name: "Wilson"
  },
  {
    id: "user_006",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Jessica",
    last_name: "Williams"
  },
  {
    id: "user_007",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Rajesh",
    last_name: "Patel"
  },
  {
    id: "user_008",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Olivia",
    last_name: "Thompson"
  },
  {
    id: "user_009",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Alex",
    last_name: "Martinez"
  },
  {
    id: "user_010",
    avatar: IMAGES.AVATAR_DUMMY_IMG,
    first_name: "Sophia",
    last_name: "Anderson"
  }
];
  

export const PASTS_SESSIONS_DATA=[
  {
    id: '1',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '2',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '3',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '4',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '5',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '6',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '7',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
  {
    id: '8',
    providerName: 'Dana Somervilla',
    serviceType: 'Tarot Reader',
    date: '20-04-2025',
  },
]

// BookingRequestsData.js - Static data for booking requests

export const BOOKING_REQUESTS_DATA = [
  {
    id: '1',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'John Style',
    rating: 4.5,
    serviceName: 'Tarot Reader',
    schedule: 'Tuesday, 02:00 PM to 03:00 PM',
    requestType: 'booking',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Sarah Johnson',
    rating: 4.8,
    serviceName: 'Astrology Consultation',
    schedule: 'Wednesday, 10:00 AM to 11:00 AM',
    requestType: 'consultation',
    createdAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Michael Chen',
    rating: 4.2,
    serviceName: 'Palm Reading',
    schedule: 'Thursday, 03:00 PM to 04:00 PM',
    requestType: 'reading',
    createdAt: '2024-01-15T08:45:00Z',
  },
  {
    id: '4',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Emma Rodriguez',
    rating: 4.6,
    serviceName: 'Numerology Analysis',
    schedule: 'Friday, 01:00 PM to 02:00 PM',
    requestType: 'analysis',
    createdAt: '2024-01-15T07:20:00Z',
  },
  {
    id: '5',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'David Wilson',
    rating: 4.3,
    serviceName: 'Crystal Healing',
    schedule: 'Saturday, 11:00 AM to 12:00 PM',
    requestType: 'healing',
    createdAt: '2024-01-15T06:30:00Z',
  },
  {
    id: '6',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Jessica Williams',
    rating: 4.7,
    serviceName: 'Meditation Guidance',
    schedule: 'Sunday, 09:00 AM to 10:00 AM',
    requestType: 'guidance',
    createdAt: '2024-01-14T18:15:00Z',
  },
  {
    id: '7',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Rajesh Patel',
    rating: 4.4,
    serviceName: 'Spiritual Counseling',
    schedule: 'Monday, 04:00 PM to 05:00 PM',
    requestType: 'counseling',
    createdAt: '2024-01-14T17:45:00Z',
  },
  {
    id: '8',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Olivia Thompson',
    rating: 4.9,
    serviceName: 'Chakra Balancing',
    schedule: 'Tuesday, 06:00 PM to 07:00 PM',
    requestType: 'balancing',
    createdAt: '2024-01-14T16:20:00Z',
  },
  {
    id: '9',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Alex Martinez',
    rating: 4.1,
    serviceName: 'Dream Analysis',
    schedule: 'Wednesday, 07:00 PM to 08:00 PM',
    requestType: 'analysis',
    createdAt: '2024-01-14T15:10:00Z',
  },
  {
    id: '10',
    image: IMAGES.BG_DUMMY_IMG,
    providerImage: IMAGES.AVATAR_DUMMY_IMG ,
    providerName: 'Sophia Anderson',
    rating: 4.8,
    serviceName: 'Energy Healing',
    schedule: 'Thursday, 12:00 PM to 01:00 PM',
    requestType: 'healing',
    createdAt: '2024-01-14T14:25:00Z',
  },
];
