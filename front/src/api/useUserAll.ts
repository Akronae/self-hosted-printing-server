import { useToken } from "@/state/token";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "./client";

export function useGetUsers() {
  const api = useApi();
  const token = useToken();
  const query = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      return await api.user.getUsers();
    },
    enabled: !!token,
  });
  return query;
}
