import { supabase } from "@services/db";
import { useQuery } from "react-query";

interface User {
  id: string;
  name: string;
  avatar_url: string;
  user_name: string;
}

// async function getUser() {
//   try {
//     const user = (await supabase.auth.getSession()).data.session?.user;
//     if (user) {
//       const flattenUser: User = {
//         id: user.id,
//         name: user.user_metadata.full_name,
//         avatar_url: user.user_metadata.avatar_url,
//         user_name: user.user_metadata.user_name,
//       };
//       return flattenUser;
//     }
//     throw Error("User not found");
//   } catch (err: unknown) {
//     console.error("err", err);
//     return null;
//   }
// }

// export function useUser(): User | null {
//   const { data: user } = useQuery<User | null>("user", getUser, {
//     suspense: true,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     onError: () => {
//       return null;
//     },
//   });

//   return user || null;
// }
