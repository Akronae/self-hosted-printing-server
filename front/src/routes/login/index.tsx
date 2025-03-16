"use client";

import { useApi } from "@/api/client";
import { useUserMe } from "@/api/useUserMe";
import { HttpResponse, LoginResponse } from "@/gen/PrinterApi";
import { useRxState } from "@/hooks/use-rx-state";
import { useToken } from "@/state/token";
import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const { token } = useToken();
  const client = useApi();
  const { me } = useUserMe();
  const logging = useRxState(false);
  const navigate = useNavigate();

  if (me.data?.data.username) {
    setTimeout(() => {
      navigate({ to: "/print" });
    }, 0);
  }
  return (
    <Stack flex={1} align="center">
      <Stack align="center" w={350} mt={100} gap={"lg"}>
        <Stack gap={"xs"} ta={"center"}>
          <Text fw={"bold"} fz={"h1"}>
            Login
          </Text>
          <Text fz={"sm"} c={"gray.5"} ta={"center"}>
            If you do not have an account, we'll create one for you.
          </Text>
        </Stack>
        <form
          onSubmit={form.onSubmit(async (values) => {
            logging.value = true;
            const exists = await client.user.getUser(values.username);
            let res: HttpResponse<LoginResponse>;
            if (exists.data) {
              try {
                res = await client.user.login({
                  username: values.username,
                  password: values.password,
                });
              } catch (_) {
                form.setErrors({ password: "Wrong password" });
                logging.value = false;
                return;
              }
            } else {
              res = await client.user.create({
                username: values.username,
                password: values.password,
              });
            }
            logging.value = false;
            token.value = res.data.token;
          })}
          style={{ width: "100%" }}
        >
          <Stack gap={"lg"}>
            <Stack w={"100%"} gap={"xs"}>
              <TextInput
                key={form.key("username")}
                {...form.getInputProps("username")}
                placeholder="Username"
                w={"100%"}
                autoFocus
              />
              <PasswordInput
                key={form.key("password")}
                {...form.getInputProps("password")}
                placeholder="Password"
                w={"100%"}
              />
            </Stack>
            <Button w={"100%"} type="submit" loading={logging.value}>
              Go
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
