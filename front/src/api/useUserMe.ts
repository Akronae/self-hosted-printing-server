import { useToken } from "@/state/token";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./client";

export function useUserMe() {
  const client = useQueryClient();
  const { token } = useToken();
  const api = useApi();
  const enabled = !!token.value;
  const me = useQuery({
    queryKey: ["user", "me", token.value],
    queryFn: () => api.user.getMe(),
    enabled,
  });
  const loading = me.isLoading;

  if (me.isError) {
    token.value = undefined;
    client.invalidateQueries({ queryKey: ["user"] });
    return { me, enabled: false, loading };
  }

  return { me, enabled, loading };
}
