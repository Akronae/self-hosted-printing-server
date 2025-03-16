import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextMenuProvider } from "mantine-contextmenu";
import { PropsWithChildren } from "react";

const theme = createTheme({});

export function Providers({ children }: PropsWithChildren) {
  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <ModalsProvider>
          <Notifications />
          <DndContext sensors={[sensors]}>
            <ContextMenuProvider>{children}</ContextMenuProvider>
          </DndContext>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
