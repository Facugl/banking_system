import { Role } from '../../utils/constants';

export interface PrivateRouteProp {
  allowedRoles?: Role[];
  publicRoute?: boolean;
  children: React.ReactNode;
}
