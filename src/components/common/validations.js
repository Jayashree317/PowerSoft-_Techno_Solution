import * as yup from 'yup';

export const emailSchema = yup.string().email('Invalid email').required('Email is required');

export const dateRangeSchema = yup.object().shape({
  startDate: yup.date().required('Start Date is required'),
  endDate: yup
    .date()
    .required('End Date is required')
    .min(yup.ref('startDate'), 'End Date must be after Start Date'),
});
