import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  coach_id: yup.string().nullable().required(),
  player_id: yup.string().nullable().required(),
  parent_id: yup.string().nullable(),
  academy_id: yup.string().nullable().required(),
});
