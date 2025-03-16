import { useApi } from "@/api/client";
import { useGetUsers } from "@/api/useUserAll";
import { useUserMe } from "@/api/useUserMe";
import pop1 from "@/assets/pop_1.mp3";
import pop2 from "@/assets/pop_2.mp3";
import { useRxState } from "@/hooks/use-rx-state";
import { useAuthGuard } from "@/state/use-auth-guard";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
  useMatches,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useTimeout } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPrinter, IconUpload, IconX } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { differenceInSeconds, isAfter } from "date-fns";
import { draw, min } from "radash";
import { useMemo } from "react";

export const Route = createFileRoute("/print/")({
  component: Print,
});

function Print() {
  useAuthGuard();

  const user = useUserMe();
  const direction = useMatches({
    base: "column-reverse" as const,
    md: "row" as const,
  });
  return (
    <Stack flex={1}>
      {!user.me.data?.data.isVerified && <WaitingForReview />}
      {user.me.data?.data.isVerified && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: direction,
            alignContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Stack
            h={{ base: "65%", md: "100%" }}
            maw={{ base: "100%", md: 300 }}
          >
            {user.me.data?.data.isAdmin && <Users />}
            <History />
          </Stack>
          <PrintPage />
        </div>
      )}
    </Stack>
  );
}

function PrintPage() {
  const api = useApi();
  const { me } = useUserMe();

  return (
    <Dropzone
      onDrop={async (files) => {
        const loading = notifications.show({
          withBorder: true,
          loading: true,
          title: "Uploading your file...",
          message: "",
        });
        await api.print.print({ file: files[0] });
        await me.refetch();
        notifications.hide(loading);
        notifications.show({
          withBorder: true,
          color: "green",
          title: "Done",
          message:
            "Your document has been successfully uploaded, you can safely quit this page.",
        });
      }}
      onReject={(files) => console.log("rejected files", files)}
      accept={["application/pdf", "image/png", "image/jpeg"]}
      flex={1}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-blue-6)"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPrinter
            size={70}
            color="var(--mantine-color-dimmed)"
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text
            fz={{ base: "h2", md: "h1" }}
            ta={{ base: "center", md: "revert" }}
            fw={"bold"}
          >
            Drag a file or click to print
          </Text>
          <Text
            size="sm"
            c="dimmed"
            ta={{ base: "center", md: "revert" }}
            inline
            mt={7}
          >
            Accepted: PDF, PNG and JPEG
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

function Users() {
  const api = useApi();
  const users = useGetUsers();

  const pending = users.data?.data.filter((x) => !x.isVerified) ?? [];
  pending.sort((a, b) => (isAfter(a.createdAt, b.createdAt) ? -1 : 1));

  if (!pending.length) return null;

  return (
    <Card>
      <Text fw={"bold"} mb={"md"}>
        Pending user registrations
      </Text>
      <Stack>
        {pending.map((x) => (
          <Card key={x.username} bg={"dark.5"} p={"xs"}>
            <Group gap={"xs"} wrap="nowrap">
              <Text fz={"sm"} truncate>
                {x.username}
              </Text>
              <ActionIcon
                size={"sm"}
                variant="subtle"
                color="green"
                ml={"auto"}
                onClick={async () => {
                  await api.user.acceptUser(x.username);
                  await users.refetch();
                }}
              >
                <IconCheck />
              </ActionIcon>
              <ActionIcon
                size={"sm"}
                variant="subtle"
                color="red"
                onClick={async () => {
                  await api.user.declineUser(x.username);
                  await users.refetch();
                }}
              >
                <IconX />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </Stack>
    </Card>
  );
}

function History() {
  const { me } = useUserMe();

  const docs = me.data?.data.printedDocuments ?? [];
  docs.sort((a, b) => (isAfter(a.createdAt, b.createdAt) ? -1 : 1));
  const durs = docs
    .filter((x) => isAfter(x.eta, new Date()))
    .map((x) => differenceInSeconds(x.eta, new Date()));
  useTimeout(me.refetch, ((min(durs) ?? Infinity) + 1) * 1000, {
    autoInvoke: true,
  });

  return (
    <Card flex={1}>
      <Text fw={"bold"} mb={"md"}>
        History
      </Text>
      <ScrollArea type="hover">
        <Stack gap={"xs"}>
          {docs.map((x) => (
            <Card key={x.id} bg={"dark.5"} p={"xs"}>
              <Stack>
                <Group gap={"xs"} wrap="nowrap">
                  <Text truncate fz={"sm"}>
                    {x.name}
                  </Text>
                  {isAfter(x.eta, new Date()) && (
                    <Tooltip label="This file is being printed">
                      <Loader size={15} ml={"auto"} dur={3} />
                    </Tooltip>
                  )}
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>
      </ScrollArea>
      {!docs.length && (
        <Text fs={"italic"} fz={"sm"} c={"gray.5"}>
          Nothing here yet...
        </Text>
      )}
    </Card>
  );
}

function WaitingForReview() {
  const pops = useMemo(() => {
    return [new Audio(pop1), new Audio(pop2), new Audio(pop2)];
  }, []);
  const clicks = useRxState(0);
  const label = useRxState("Press me");

  return (
    <Stack align="center" gap={"xl"} flex={1}>
      <Stack justify="center" gap={0}>
        <Text fz={"h1"} fw="bold" ta={"center"}>
          You're almost done
        </Text>
        <Text ta={"center"}>An administrator will review your account.</Text>
      </Stack>

      <Stack justify="center" gap={"xs"} maw={350}>
        <Text ta={"center"}>Here is a button you can press to pass time.</Text>
        <Button
          size="xl"
          variant="default"
          onClick={() => {
            draw(pops)?.play();
            clicks.value++;

            if (!/^-?\d+$/.test(label.value)) {
              if (Math.random() < 0.8) return;
            }
            if (Math.random() > 0.9) {
              label.value = draw([
                "Wow!",
                "><",
                "You're doing great",
                "Good job!",
              ])!;
            } else {
              label.value = clicks.value.toString();
            }
          }}
        >
          {label.value}
        </Button>
      </Stack>
    </Stack>
  );
}
