import React from "react";
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from "../utils/permissions";
import { useAuth } from "../context/AuthContext";

interface PermissionGateProps {
  children: React.ReactNode;
  requires?: Permission | Permission[];
  requireAll?: boolean; // If true, requires ALL permissions; if false, requires ANY
  fallback?: React.ReactNode;
}

/**
 * Component for conditional rendering based on permissions
 * Renders children if user has required permissions, otherwise renders fallback
 */
export function PermissionGate({
  children,
  requires,
  requireAll = true,
  fallback = null
}: PermissionGateProps) {
  const { user } = useAuth();

  if (!requires) {
    // If no permissions required, always render children
    return <>{children}</>;
  }

  const permissions = Array.isArray(requires) ? requires : [requires];
  
  let hasAccess: boolean;
  if (requireAll) {
    hasAccess = hasAllPermissions(user?.role ?? null, permissions);
  } else {
    hasAccess = hasAnyPermission(user?.role ?? null, permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

interface ConditionalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  requires?: Permission | Permission[];
  requireAll?: boolean;
  tooltipOnDenied?: string;
}

/**
 * Button component that auto-disables based on permissions
 */
export function PermissionButton({
  children,
  requires,
  requireAll = true,
  tooltipOnDenied,
  disabled,
  ...props
}: ConditionalButtonProps) {
  const { user } = useAuth();

  if (!requires) {
    return (
      <button disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  const permissions = Array.isArray(requires) ? requires : [requires];
  let hasAccess: boolean;
  if (requireAll) {
    hasAccess = hasAllPermissions(user?.role ?? null, permissions);
  } else {
    hasAccess = hasAnyPermission(user?.role ?? null, permissions);
  }

  const isDisabled = disabled || !hasAccess;
  
  const title = !hasAccess && tooltipOnDenied ? tooltipOnDenied : undefined;

  return (
    <button 
      disabled={isDisabled} 
      title={title}
      {...props}
    >
      {children}
    </button>
  );
}
