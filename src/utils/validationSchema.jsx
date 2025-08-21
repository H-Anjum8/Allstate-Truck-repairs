import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

export const getValidationSchema = formType => {
  switch (formType) {
    case 'signup':
      return Yup.object().shape({
        fullName: Yup.string().required('Full name required'),
        email: Yup.string().email('Invalid email').required('Email required'),
        phone: Yup.string().required('Phone number required'),
        password: Yup.string()
          .min(6, 'Minimum 6 characters')
          .required('Password required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm your password'),
      });
    case 'login':
      return Yup.object().shape({
        email: Yup.string()
          .required('Phone number or email is required')
          .test(
            'email-or-phone',
            'Enter a valid email or phone number',
            value =>
              !!value &&
              (Yup.string().email().isValidSync(value) ||
                /^[0-9]{10,14}$/.test(value)),
          ),
        password: Yup.string()
          .min(6, 'Minimum 6 characters')
          .required('Password required'),
      });
    case 'emailUpdate':
      return Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
      });
    case 'verifyotp':
      return Yup.object().shape({
        otp: Yup.array()
          .of(Yup.string().length(1, 'Must be 1 digit'))
          .min(5, 'OTP must be 5 digits')
          .max(5, 'OTP must be 5 digits')
          .test('all-filled', 'Enter all 5 digits', value =>
            value.every(v => v !== ''),
          ),
        otp: Yup.string()
          .length(5, 'Enter 5 digit code')
          .required('OTP is required'),
      });
    case 'newpassword':
      return Yup.object().shape({
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });
    case 'signup_verify_otp':
      return Yup.object().shape({
        otp: Yup.array()
          .of(
            Yup.string().required(''), // Empty string means no per-digit error
          )
          .test('all-filled', 'Please enter all 6 digits', value => {
            if (!value) return false;
            return value.every(v => v !== '');
          }),
      });
    case 'payment':
      return Yup.object().shape({
        cardHolderName: Yup.string().required('Card holder name is required'),
        cardNumber: Yup.string()
          .matches(/^\d{16}$/, 'Card number must be 16 digits')
          .required('Card number is required'),
        expiryDate: Yup.string().required('Expiry date is required'),
        cvv: Yup.string()
          .matches(/^\d{3}$/, 'CVV must be 3 digits')
          .required('CVV is required'),
      });
    case 'personal_information':
      return Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Enter a valid email')
          .required('Email is required'),
        phone: Yup.string()
          .matches(
            /^\d{3}[-–]\d{3}[-–]\d{4}$/,
            'Phone must be in 111–111–1111 format',
          )
          .required('Phone number is required'),
      });
    case 'change_password':
      return Yup.object().shape({
        currentPassword: Yup.string().min(6, 'Too short!').required('Required'),
        newPassword: Yup.string().min(6, 'Too short!').required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'Passwords must match')
          .required('Required'),
      });

    case 'update_email':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim()) // Apply trim during validation
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
      });
    case 'add_email':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim()) // Apply trim during validation
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
      });
    case 'create_event':
      return Yup.object().shape({
        title: Yup.string().trim().required('Event title is required'),
        category: Yup.string().required('Category is required'),
        subCategory: Yup.string().required('Sub Category is required'),
        eventDate: Yup.string().required('Event date is required'),
        startTime: Yup.string().required('Start time is required'),
        endTime: Yup.string().required('End time is required'),
        lat: Yup.number().required('Location latitude is required'),
        lng: Yup.number().required('Location longitude is required'),
        description: Yup.string().required('Description is required'),
        sponsors: Yup.string().required('Sponsor is required'),
        images: Yup.array()
          .min(1, 'At least 4 images are required')
          .required('Images are required'),
        isFeatured: Yup.boolean(),
      });
    case 'setup_profile':
      return Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        phone: Yup.string()
          .matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits')
          .required('Phone number is required'),
        vehicleType: Yup.string().required('Vehicle type is required'),
        licensePlate: Yup.string().required('License plate is required'),
        location: Yup.string().required('Location is required'),
      });
    case 'edit_profile':
      return Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
      });
    case 'contact_support':
      return Yup.object().shape({
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),
      });

    case 'BookingSchema':
      return Yup.object().shape({
        description: Yup.string()
          .trim()
          .min(10, 'Description must be at least 10 characters')
          .required('Description is required'),
        photos: Yup.array()
          .min(1, 'Please upload at least one photo')
          .required('Please upload at least one photo'),
      });
    case 'AddVehicle':
      return Yup.object().shape({
        vehicleName: Yup.string().required('Vehicle name is required'),
        make: Yup.string().required('Make is required'),
        model: Yup.string().required('Model is required'),
        year: Yup.string()
          .matches(/^[0-9]{4}$/, 'Enter valid year')
          .required('Year is required'),
        licensePlate: Yup.string().required('License plate is required'),
        vin: Yup.string().required('VIN is required'),
      });
    case 'EditVehicle':
      return Yup.object().shape({
        vehicleName: Yup.string().required('Vehicle name is required'),
        make: Yup.string().required('Make is required'),
        model: Yup.string().required('Model is required'),
        year: Yup.string()
          .matches(/^[0-9]{4}$/, 'Enter valid year')
          .required('Year is required'),
        licensePlate: Yup.string().required('License plate is required'),
      });
    case 'addDriver':
      return Yup.object().shape({
        fullName: Yup.string()
          .required('Full name is required')
          .min(3, 'Full name must be at least 3 characters'),

        phone: Yup.string()
          .required('Phone number is required')
          .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),

        email: Yup.string()
          .required('Email is required')
          .email('Enter a valid email'),

        licenseNumber: Yup.string()
          .required('License number is required')
          .min(4, 'License number must be at least 4 characters'),

        licenseExpiry: Yup.string()
          .required('License expiry is required')
          .matches(/^\d{4}-\d{2}-\d{2}$/, 'Use format YYYY-MM-DD'),
      });
    case 'editDriver':
      return Yup.object().shape({
        fullName: Yup.string()
          .required('Full name is required')
          .min(3, 'Full name must be at least 3 characters'),

        phone: Yup.string()
          .required('Phone number is required')
          .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),

        email: Yup.string()
          .required('Email is required')
          .email('Enter a valid email'),

        licenseNumber: Yup.string()
          .required('License number is required')
          .min(4, 'License number must be at least 4 characters'),

        licenseExpiry: Yup.string()
          .required('License expiry is required')
          .matches(/^\d{4}-\d{2}-\d{2}$/, 'Use format YYYY-MM-DD'),
      });
    default:
      return Yup.object();
  }
};
