import { useUserMe } from "@/api/useUserMe";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { me } = useUserMe();
  const navigate = useNavigate();

  if (me.isLoading) {
    return <div>Loading...</div>;
  }

  setTimeout(() => {
    if (!me.data?.data.username) {
      navigate({ to: "/login" });
    } else {
      navigate({ to: "/print" });
    }
  }, 0);
}
