'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';
import { profileSchema } from '@/schemas/user.schema';

export function ProfileForm() {
   const { state, updateProfile } = useAuth();

   const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
         username: state.user?.username || '',
         email: state.user?.email || '',
         phone: state.user?.phone || '',
         address: state.user?.address || '',
      },
   });

   const onSubmit = async (data: z.infer<typeof profileSchema>) => {
      try {
         await updateProfile(data);
         toast.success("Profil mis à jour", {
            description: "Vos informations ont été mises à jour avec succès.",
         });
      } catch (error: any) {
         toast.error("Erreur", {
            description: error.message,
         });
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Champs du formulaire */}
         </form>
      </Form>
   );
}
