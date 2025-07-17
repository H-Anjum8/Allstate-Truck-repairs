import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

export const getValidationSchema = formType => {
  switch (formType) {
    case 'user_signup':
      return Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        username: Yup.string().trim().required('Username is required'),
        email: Yup.string()
          .trim()
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        date_of_birth: Yup.string().required('Date of birth is required'),
        time_of_birth: Yup.string().required('Time of birth is required'),
        location_of_birth: Yup.string().required(
          'Location of birth is required',
        ),
        gender: Yup.string().required('Gender is required'),
      });
    case 'provider_signup':
      return Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        username: Yup.string().trim().required('Username is required'),
        email: Yup.string()
          .trim()
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
      });
    case 'login':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim()) // Apply trim during validation
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      });

    case 'otp_verification':
      return Yup.object().shape({
        otp: Yup.string()
          .required('OTP is required')
          .matches(/^\d{4}$/, 'Enter a valid 4-digit OTP'),
      });
    case 'introduction':
      return Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        location: Yup.string().trim().required('Location is required'),
        languages: Yup.string()
          .trim()
          .required('Please select at least one language'),
        gender: Yup.string().required('Please select your gender'),
      });
    case 'bio':
      return Yup.object().shape({
        bio: Yup.string().required('Bio is required'),
      });
    case 'pro_title':
      return Yup.object().shape({
        professionalTitle: Yup.string()
          .required('Professional title is required')
          .min(2, 'Title is too short'),
      });
    case 'educational_experience':
      return Yup.object().shape({
        edu_experience: Yup.string().required('Bio is required'),
      });
    case 'create_service':
      return Yup.object().shape({
        serviceName: Yup.string()
          .required('Service name is required')
          .min(3, 'Service name must be at least 3 characters'),

        serviceDescription: Yup.string()
          .required('Description is required')
          .min(
            20,
            'Please provide a more detailed description (minimum 20 characters)',
          ),

        serviceRate: Yup.number()
          .typeError('Rate must be a number')
          .required('Rate is required')
          .positive('Rate must be a positive number'),

        availability: Yup.object()
          .shape({
            date: Yup.string().required('Date is required'),
          })
          .required('Availability date is required'),

        startTime: Yup.string().required('Start time is required'),

        endTime: Yup.string().required('End time is required'),

        duration: Yup.string().required('Duration selection is required'),

        serviceCategory: Yup.string().required('Category is required'),

        serviceImage: Yup.string().nullable(),
      });

    case 'profile_info':
      return Yup.object().shape({
        industry: Yup.string().trim().required('Industry/Service is required'),
        job_title: Yup.string().trim().required('Job Title is required'),
        business_name: Yup.string()
          .trim()
          .required('Business Name is required'),
        business_address: Yup.string()
          .trim()
          .required('Business Address is required'),
        website: Yup.string().nullable(),
        company_description: Yup.string()
          .trim()
          .required('Company Description is required'),
        mission_statement: Yup.string()
          .trim()
          .required('Vision Statement is required'),
      });
    case 'forgot_password':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim())
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
      });
    case 'create_new_password':
      return Yup.object().shape({
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
      });
    case 'update_email':
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

    default:
      return Yup.object();
  }
};
