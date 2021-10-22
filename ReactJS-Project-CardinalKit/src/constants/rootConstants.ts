import { LoginActionType } from './loginConstants';
import { UsersActionType } from './usersConstants';
import { ProvidersActionType } from './providersConstants';

export type ActionType = ProvidersActionType | UsersActionType | LoginActionType;
