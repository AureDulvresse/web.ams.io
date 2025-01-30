"use client";

import { Role } from "@/src/types/role";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Shield, Trash2, Users } from "lucide-react";
import { useState } from "react";
import ModalForm from "@/src/components/common/modal-form";
import { RoleFormFields } from "@/src/forms/role-form";
import { useForm } from "react-hook-form";
import { deleteRole, updateRole } from "@/src/actions/role.actions";
import { useDelete, useUpdate } from "@/src/hooks/use-server-action";
import { toast } from "sonner";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/src/components/ui/table";
import ModalConfirm from "@/src/components/common/modal-confirm";
import { roleSchema } from "@/src/schemas/role.schema";
import { z } from "zod";

interface RoleDetailViewProps {
   role: Role;
}

export default function RoleDetailView({ role }: RoleDetailViewProps) {
   const router = useRouter();
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const roleForm = useForm<z.infer<typeof roleSchema>>();

   const deleteMutation = useDelete(deleteRole, {
      onSuccess: () => {
         toast.success("Rôle supprimé avec succès");
         router.push("/users/roles");
      },
      onError: (error) => {
         toast.error(error.message);
      },
      invalidateQueries: ["/api/roles", "list"],
   });

   const handleDelete = () => {
      deleteMutation.mutate(role.id);
   };

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <Button
               variant="outline"
               onClick={() => router.back()}
               className="gap-2"
            >
               <ArrowLeft className="w-4 h-4" />
               Retour
            </Button>
            <div className="flex gap-2">
               <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="gap-2"
               >
                  <Edit className="w-4 h-4" />
                  Modifier
               </Button>
               <ModalConfirm
                  trigger={
                     <Button variant="destructive" className="gap-2">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                     </Button>
                  }
                  title="Supprimer le rôle"
                  description={`Êtes-vous sûr de vouloir supprimer le rôle "${role.name}" ? Cette action est irréversible.`}
                  confirmText="Supprimer"
                  cancelText="Annuler"
                  onConfirm={handleDelete}
               />
            </div>
         </div>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <p className="uppercase">{role.name}</p>
               </CardTitle>
               <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div>
                  <h3 className="text-lg font-semibold mb-4">Permissions</h3>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Nom</TableHead>
                           <TableHead>Description</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {role.permissions?.map((perm) => (
                           <TableRow key={perm.permissionId}>
                              <TableCell>{perm.permission.name}</TableCell>
                              <TableCell>{perm.permission.description}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>

               <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                     <Users className="w-5 h-5" />
                     Utilisateurs avec ce rôle
                  </h3>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Nom</TableHead>
                           <TableHead>email</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {role.permissions?.map((perm) => (
                           <TableRow key={perm.permissionId}>
                              <TableCell>{perm.permission.name}</TableCell>
                              <TableCell>{perm.permission.description}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>
            </CardContent>
         </Card>

         <ModalForm
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Modifier le rôle: ${role.name}`}
            defaultValues={{
               name: role.name,
               description: role.description || "",
               permissionIds: role.permissions.map((p) => p.permissionId),
            }}
            serverAction={(data) => updateRole(role.id, data)}
            invalidQuery={["/api/roles", "list", `role-${role.id}`]}
            successMessage="Rôle modifié avec succès"
         >
            <RoleFormFields form={roleForm} />
         </ModalForm>
      </div>
   );
}