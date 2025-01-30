import UnauthorizedAccess from "@/src/components/common/unauthorized-access";
import { AuthContext } from "@/src/context/auth-context";
import { PermissionManager } from "@/src/lib/permissions";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext);

  // Vérification de permission
  if (!PermissionManager.canAccess(user, ['ADMIN', 'DIRECTOR'])) {
    return <UnauthorizedAccess />;
  }

  return <div>Dashboard Administrateur</div>;
}
