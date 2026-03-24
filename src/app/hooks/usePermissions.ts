import { useAuth } from "../context/AuthContext";
import { Permission, hasPermission, hasAllPermissions, hasAnyPermission, canManageResource } from "../utils/permissions";

/**
 * Hook to check if current user has a specific permission
 */
export function useHasPermission(permission: Permission): boolean {
  const { user } = useAuth();
  return hasPermission(user?.role ?? null, permission);
}

/**
 * Hook to check if current user has all specified permissions
 */
export function useHasAllPermissions(permissions: Permission[]): boolean {
  const { user } = useAuth();
  return hasAllPermissions(user?.role ?? null, permissions);
}

/**
 * Hook to check if current user has any of the specified permissions
 */
export function useHasAnyPermission(permissions: Permission[]): boolean {
  const { user } = useAuth();
  return hasAnyPermission(user?.role ?? null, permissions);
}

/**
 * Hook to check if user can manage a specific resource
 */
export function useCanManageResource(resourceOwnerId: string | undefined, adminPermission: Permission): boolean {
  const { user } = useAuth();
  return canManageResource(user?.role ?? null, resourceOwnerId, user?.id, adminPermission);
}

/**
 * Hook to get all details about current user permissions
 */
export function usePermissions() {
  const { user } = useAuth();
  
  return {
    hasPermission: (permission: Permission) => hasPermission(user?.role ?? null, permission),
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(user?.role ?? null, permissions),
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(user?.role ?? null, permissions),
    canManage: (resourceOwnerId: string | undefined, adminPermission: Permission) =>
      canManageResource(user?.role ?? null, resourceOwnerId, user?.id, adminPermission),
    role: user?.role
  };
}
