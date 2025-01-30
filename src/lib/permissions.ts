// src/lib/permissions.ts
import { AUTH_CONFIG } from "@/auth.config";
import { User } from "@/types/auth";

export class PermissionManager {
  static canAccess(user: User | null, requiredRoles: string[]): boolean {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  }

  static isAdmin(user: User | null): boolean {
    return user?.role === AUTH_CONFIG.roles.ADMIN;
  }

  static getRoleHierarchy(): Record<string, string[]> {
    return {
      [AUTH_CONFIG.roles.ADMIN]: Object.values(AUTH_CONFIG.roles),
      [AUTH_CONFIG.roles.DIRECTOR]: [
        AUTH_CONFIG.roles.DHR,
        AUTH_CONFIG.roles.STAFF,
        AUTH_CONFIG.roles.TEACHER,
      ],
    };
  }

  static hasHigherOrEqualRole(userRole: string, targetRole: string): boolean {
    const hierarchy = this.getRoleHierarchy();
    const adminRoles = hierarchy[AUTH_CONFIG.roles.ADMIN] || [];
    const directorRoles = hierarchy[AUTH_CONFIG.roles.DIRECTOR] || [];

    if (adminRoles.includes(userRole)) return true;
    if (directorRoles.includes(userRole) && directorRoles.includes(targetRole))
      return true;

    return userRole === targetRole;
  }
}
