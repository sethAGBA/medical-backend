import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../users/user.entity'; // Importez l'enum UserRole
import { ROLES_KEY } from './roles.decorator'; // Importez la clé ROLES_KEY

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupère les rôles requis à partir des métadonnées de la route
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Si aucun rôle n'est requis, autoriser l'accès
    }

    // Récupère l'utilisateur à partir de la requête
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Vérifie si l'utilisateur a l'un des rôles requis
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    return true;
  }
}