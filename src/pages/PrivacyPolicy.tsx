import { Container, Text, Title } from "@mantine/core";

export const PrivacyPolicy = () => (
  <Container>
    <Title order={1} my="md">
      Privacy Policy
    </Title>
    <Text>
      This Privacy Policy describes how we collect, use, and share your personal
      information when you use our app.
    </Text>

    <Title order={2} my="md">
      Information We Collect
    </Title>
    <Text>
      We collect personal information such as your name, email address, and
      phone number when you sign up or log in to our app, just to inform you in
      the app which user you are logged in with.
    </Text>

    <Title order={2} my="md">
      How We Use Your Information
    </Title>
    <Text>We do NOT use information for anything else beside login!</Text>

    <Title order={2} my="md">
      Third-Party Services
    </Title>
    <Text>
      We do NOT share your information with any third-party service providers!
    </Text>

    <Title order={2} my="md">
      Data Security
    </Title>
    <Text>
      We take appropriate security measures to protect your personal information
      from unauthorized access, disclosure, alteration, or destruction. However,
      no security measures are 100% secure, and we cannot guarantee the security
      of your information.
    </Text>

    <Title order={2} my="md">
      Your Rights
    </Title>
    <Text>
      You have the right to access, correct, or delete your personal
      information. If you wish to exercise these rights, please contact us at
      the email address provided below contact@soueidan.com.
    </Text>

    <Title order={2} my="md">
      Changes to This Policy
    </Title>
    <Text>
      We may update this Privacy Policy from time to time. We will notify you of
      any significant changes by posting the new policy on our app.
    </Text>

    <Title order={2} my="md">
      Contact Us
    </Title>
    <Text>
      If you have any questions about this Privacy Policy, please contact us at
      contact@soueidan.com.
    </Text>
  </Container>
);

export default PrivacyPolicy;
