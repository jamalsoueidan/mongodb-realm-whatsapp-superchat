import { Button, Flex, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useApp } from "@realm/react";
import { IconBrandFacebook } from "@tabler/icons-react";
import { useEffect } from "react";
import { useLogin } from "react-facebook";
import Realm from "realm";

export const LoginFacebook = () => {
  const app = useApp();
  const { login, isLoading } = useLogin();

  const [visible, { open, close }] = useDisclosure(true);
  const accessToken = localStorage.getItem("facebookAccessToken");

  useEffect(() => {
    open();
    app.logIn(Realm.Credentials.facebook(accessToken || "")).finally(close);
  }, []);

  async function handleLogin() {
    open();
    const response = await login({
      scope: "email",
    });

    const accessToken = response.authResponse.accessToken;
    localStorage.setItem("facebookAccessToken", accessToken);
    app.logIn(Realm.Credentials.facebook(accessToken)).finally(close);
  }

  return (
    <Flex justify="center" align="center" h="90vh">
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        radius="100"
        size="xl"
        color="green"
        rightSection={<IconBrandFacebook />}
      >
        Login
      </Button>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Flex>
  );
};
