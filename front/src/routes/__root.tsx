import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </RootLayout>
  ),
});

import { Providers } from "@/components/providers";
import { useToken } from "@/state/token";
import { ActionIcon, AppShell, Button, Group, Text } from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconDoorExit,
  IconFileFilled,
} from "@tabler/icons-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        padding="md"
        style={{ display: "flex", flex: 1 }}
        styles={{
          main: { display: "flex", flex: 1, maxHeight: "100vh" },
        }}
      >
        <Header />
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </Providers>
  );
}

function Header() {
  const navigate = useNavigate();
  const { token } = useToken();

  return (
    <AppShell.Header style={{ height: 50 }}>
      <Group h="100%">
        <Group h="100%" px="md" gap={"xs"} align="center" flex={1}>
          <IconFileFilled
            size={25}
            onClick={() => {
              navigate({ to: "/" });
            }}
            style={{ cursor: "pointer" }}
          />
          <Text fz={"lg"} fw={"bold"} visibleFrom="sm">
            Self Hosted Printing Server
          </Text>
          <ActionIcon
            size={"lg"}
            color="gray"
            variant="subtle"
            ml={"auto"}
            onClick={() => {
              token.value = undefined;
            }}
          >
            <IconDoorExit color="gray" />
          </ActionIcon>
          <Button
            leftSection={<IconBrandGithubFilled size={18} />}
            color="dark"
            variant="default"
            onClick={() =>
              window.open(
                "https://github.com/Akronae/self-hosted-printing-server",
                "_blank"
              )
            }
          >
            Contribute on GitHub
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
