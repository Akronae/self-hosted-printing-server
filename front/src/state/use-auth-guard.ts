import { useUserMe } from "@/api/useUserMe";
import { useNavigate } from "@tanstack/react-router";

export function useAuthGuard() {
  const { me, enabled, loading } = useUserMe();
  const navigate = useNavigate();

  console.log({ enabled, loading, me });

  if (
    (!enabled && !loading) ||
    me.isError ||
    (!me.isPending && !me.data?.data.username)
  ) {
    navigate({ to: "/login" });
  }

  return { loading: me.isPending };
}
