import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../users/user.entity'; // Importez l'enum UserRole

export const ROLES_KEY = 'roles'; // Clé pour stocker les métadonnées

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);