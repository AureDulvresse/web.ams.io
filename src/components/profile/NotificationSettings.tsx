'use client';

import { Switch } from "@/src/components/ui/switch";
import { useAuth } from '@/context/auth-context';

export function NotificationSettings() {
   const { state, updateNotificationPreferences } = useAuth();
   const preferences = state.user?.notification_preferences || {};

   const toggleNotification = async (key: string, value: boolean) => {
      try {
         await updateNotificationPreferences({
            ...preferences,
            [key]: value,
         });
      } catch (error) {
         // Gérer l'erreur
      }
   };

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <h4 className="font-medium">Notifications par email</h4>
               <p className="text-sm text-gray-500">
                  Recevoir des notifications par email
               </p>
            </div>
            <Switch
               checked={preferences.email_notifications}
               onCheckedChange={(checked) =>
                  toggleNotification('email_notifications', checked)
               }
            />
         </div>
         {/* Autres paramètres de notification */}
      </div>
   );
}