import { IAddress } from 'app/shared/model/address.model';
import { IFears } from 'app/shared/model/fears.model';
import { IImage } from 'app/shared/model/image.model';
import { IEventType } from 'app/shared/model/event-type.model';
import { IActivityType } from 'app/shared/model/activity-type.model';
import { ILessonType } from 'app/shared/model/lesson-type.model';
import { ICompetitionType } from 'app/shared/model/competition-type.model';
import { IBooking } from 'app/shared/model/booking.model';
import { IHorseOwner } from 'app/shared/model/horse-owner.model';
import { IBox } from 'app/shared/model/box.model';

export interface IHorse {
  id?: number;
  photo?: string | null;
  fullName?: string;
  phoneNumber?: string | null;
  email?: string | null;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  breed?: string | null;
  yearsBeenRidden?: number | null;
  color?: string | null;
  description?: string | null;
  appropriateLevelExperience?: number | null;
  riderAcceptedAge?: number | null;
  riderAcceptedWeight?: number | null;
  riderAcceptedHeight?: number | null;
  rate?: number | null;
  ridingEquipmentIncluded?: boolean | null;
  gender?: string | null;
  temperament?: string | null;
  horseType?: string | null;
  knowledgeBeforeRide?: string | null;
  insurance?: boolean | null;
  showOwner?: boolean | null;
  showInPublic?: boolean | null;
  showPicturesInBank?: boolean | null;
  address?: IAddress | null;
  fears?: IFears | null;
  images?: IImage[] | null;
  eventTypes?: IEventType[] | null;
  activityTypes?: IActivityType[] | null;
  lessonTypes?: ILessonType[] | null;
  competitionTypes?: ICompetitionType[] | null;
  bookings?: IBooking[] | null;
  horseOwner?: IHorseOwner | null;
  box?: IBox | null;
}

export const defaultValue: Readonly<IHorse> = {
  ridingEquipmentIncluded: false,
  insurance: false,
  showOwner: false,
  showInPublic: false,
  showPicturesInBank: false,
};
