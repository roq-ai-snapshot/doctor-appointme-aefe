import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  coach_id: string;
  player_id: string;
  parent_id?: string;
  academy_id: string;
  start_time: any;
  end_time: any;
  created_at?: any;
  updated_at?: any;

  user_appointment_coach_idTouser?: UserInterface;
  user_appointment_player_idTouser?: UserInterface;
  user_appointment_parent_idTouser?: UserInterface;
  academy?: AcademyInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  coach_id?: string;
  player_id?: string;
  parent_id?: string;
  academy_id?: string;
}
