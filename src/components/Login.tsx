import {
  Box,
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Overlay,
} from "@mantine/core";
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
  const accessToken =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN
      : localStorage.getItem("facebookAccessToken");

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
        pos="absolute"
        left="auto"
        top="auto"
        style={{ zIndex: 999 }}
      >
        Login
      </Button>
      <Box>
        <Image
          src="https://github.com/jamalsoueidan/whatsapp-superchat/blob/main/screenshots/app.png?raw=true"
          alt="Demo"
          mah="100vh"
        />
        <Overlay color="#000" backgroundOpacity={0.82} />
      </Box>

      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Flex>
  );
};
