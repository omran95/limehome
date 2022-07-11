import { Hotel } from './Hotel';
import { Location } from './valueObjects/Location';

export interface IMaps {
  getHotelsNearLocation(location: Location): Promise<Hotel[]>;
}
