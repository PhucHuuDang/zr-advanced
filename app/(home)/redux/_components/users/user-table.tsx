"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "./delete-dialog";
import {
  Pencil,
  Trash2,
  Plus,
  Building2,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
  User,
} from "../../features/thunk-slice";
import { UserDialog } from "./user-dialog";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RootState } from "../../r-stores/store";
import { SLICE_NAMES } from "../../key/slice-names";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "sonner";
import Link from "next/link";

const url = "https://jsonplaceholder.typicode.com/users";

export function UserTable() {
  const { users, status, error } = useAppSelector(
    (state: RootState) => state[SLICE_NAMES.THUNK]
  );

  const dispatch = useAppDispatch();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleUserSaved = (user: User) => {
    if (selectedUser) {
      dispatch(updateUser({ id: user.id, user }));

      // console.log({ test });
    } else {
      // setUsers([...users, user]);

      const id = new Date().getTime();

      const newUser = {
        ...user,
        id,
      };

      dispatch(addUser(newUser));
    }
  };

  const handleUserDeleted = (id: number) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsers(url));
  }, [dispatch]);

  console.log({ status });
  console.log({ error });
  console.log({ users });

  return (
    // <div className="space-y-6">
    //   <div className="flex items-center justify-between">
    //     <div>
    //       <h1 className="text-3xl font-semibold tracking-tight text-balance">
    //         User Management
    //       </h1>
    //       <p className="text-muted-foreground mt-1">
    //         Manage your user database
    //       </p>
    //     </div>
    //     <Button onClick={handleCreate} className="gap-2">
    //       <Plus className="h-4 w-4" />
    //       Add User
    //     </Button>
    //   </div>

    //   <div className="grid gap-4">
    //     {users.map((user: User) => (
    //       <div
    //         key={user.id}
    //         className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
    //       >
    //         <div className="flex items-start justify-between gap-4">
    //           <div className="flex-1 space-y-4">
    //             <div className="flex items-start justify-between">
    //               <div>
    //                 <h3 className="text-lg font-semibold text-card-foreground">
    //                   {user.name}
    //                 </h3>
    //                 <p className="text-sm text-muted-foreground">
    //                   @{user.username}
    //                 </p>
    //               </div>
    //               <div className="flex gap-2">
    //                 <Button
    //                   variant="ghost"
    //                   size="icon"
    //                   onClick={() => handleEdit(user)}
    //                   className="h-8 w-8"
    //                 >
    //                   <Pencil className="h-4 w-4" />
    //                   <span className="sr-only">Edit user</span>
    //                 </Button>
    //                 <Button
    //                   variant="ghost"
    //                   size="icon"
    //                   onClick={() => handleDelete(user)}
    //                   className="h-8 w-8 text-destructive hover:text-destructive"
    //                 >
    //                   <Trash2 className="h-4 w-4" />
    //                   <span className="sr-only">Delete user</span>
    //                 </Button>
    //               </div>
    //             </div>

    //             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    //               <div className="flex items-center gap-2 text-sm">
    //                 <Globe className="h-4 w-4 text-muted-foreground" />
    //                 <div>
    //                   <p className="text-muted-foreground text-xs">Email</p>
    //                   <p className="text-card-foreground">{user.email}</p>
    //                 </div>
    //               </div>

    //               <div className="flex items-center gap-2 text-sm">
    //                 <Phone className="h-4 w-4 text-muted-foreground" />
    //                 <div>
    //                   <p className="text-muted-foreground text-xs">Phone</p>
    //                   <p className="text-card-foreground">{user.phone}</p>
    //                 </div>
    //               </div>

    //               <div className="flex items-center gap-2 text-sm">
    //                 <MapPin className="h-4 w-4 text-muted-foreground" />
    //                 <div>
    //                   <p className="text-muted-foreground text-xs">Location</p>
    //                   <p className="text-card-foreground">
    //                     {user.address?.city ?? "N/A"}
    //                   </p>
    //                 </div>
    //               </div>

    //               <div className="flex items-center gap-2 text-sm">
    //                 <Building2 className="h-4 w-4 text-muted-foreground" />
    //                 <div>
    //                   <p className="text-muted-foreground text-xs">Company</p>
    //                   <p className="text-card-foreground">
    //                     {user.company?.name ?? "N/A"}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
    //               <Globe className="h-3.5 w-3.5 text-muted-foreground" />
    //               <a
    //                 href={`https://${user.website}`}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-accent hover:underline"
    //               >
    //                 {user.website}
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   <UserDialog
    //     user={selectedUser}
    //     open={isDialogOpen}
    //     onOpenChange={setIsDialogOpen}
    //     onUserSaved={handleUserSaved}
    //   />

    //   <DeleteDialog
    //     user={userToDelete}
    //     open={isDeleteDialogOpen}
    //     onOpenChange={setIsDeleteDialogOpen}
    //     onUserDeleted={handleUserDeleted}
    //   />
    // </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your user database
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-5">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {user.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        @{user.username}
                      </span>
                    </div>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 inline-block"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                      className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit user</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user)}
                      className="h-9 w-9 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete user</span>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-primary/50">
                    <div className="flex-shrink-0 mt-0.5">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-0.5">
                        Phone
                      </p>
                      <p className="text-sm text-card-foreground truncate">
                        {user.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-primary/50">
                    <div className="flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-0.5">
                        Location
                      </p>
                      <p className="text-sm text-card-foreground truncate">
                        {user.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-primary/50">
                    <div className="flex-shrink-0 mt-0.5">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-0.5">
                        Company
                      </p>
                      <p className="text-sm text-card-foreground truncate">
                        {user.company.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-primary/50">
                    <div className="flex-shrink-0 mt-0.5">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-0.5">
                        Website
                      </p>
                      <Link
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline truncate block"
                      >
                        {user.website}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <UserDialog
        user={selectedUser}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUserSaved={handleUserSaved}
      />

      <DeleteDialog
        user={userToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onUserDeleted={handleUserDeleted}
      />
    </div>
  );
}
