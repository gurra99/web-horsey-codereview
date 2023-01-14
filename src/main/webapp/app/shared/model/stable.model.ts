import { IImage } from 'app/shared/model/image.model';
import { IBox } from 'app/shared/model/box.model';
import { ICourtyard } from 'app/shared/model/courtyard.model';

export interface IStable {
  id?: number;
  photo?: string | null;
  name?: string | null;
  description?: string | null;
  buildYear?: number | null;
  ridingEquipment?: string | null;
  showInPublic?: boolean | null;
  images?: IImage[] | null;
  boxes?: IBox[] | null;
  courtyard?: ICourtyard;
}

export const defaultValue: Readonly<IStable> = {
  showInPublic: false,
};
