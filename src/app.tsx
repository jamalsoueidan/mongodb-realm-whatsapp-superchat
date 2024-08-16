import "@mantine/charts/styles.css";
import { Flex, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { useEffect } from "react";
import { FacebookProvider } from "react-facebook";
import { Router, useLocation, useRoute } from "wouter";
import { LeftNavigation } from "./components/LeftNavigation";
import { LoginFacebook } from "./components/Login";
import { TopNavigation } from "./components/TopNavigation";
import { useMobile } from "./hooks/useMobile";
import { useVisualViewportHeight } from "./hooks/useVisualViewportHeight";
import {
  ConversationSchema,
  Message_interactive_action_parameters_flow_action_payloadSchema,
  Message_interactive_action_parametersSchema,
  Message_interactive_actionSchema,
  Message_interactive_bodySchema,
  Message_interactive_footerSchema,
  Message_interactive_headerSchema,
  Message_interactive_metadataSchema,
  Message_interactive_reply_bookatable_commentSchema,
  Message_interactive_reply_bookatable_dateSchema,
  Message_interactive_reply_bookatable_timeSchema,
  Message_interactive_reply_bookatable_totalSchema,
  Message_interactive_reply_bookatableSchema,
  Message_interactive_reply_feedback_commentSchema,
  Message_interactive_reply_feedback_foodSchema,
  Message_interactive_reply_feedback_serviceSchema,
  Message_interactive_reply_feedbackSchema,
  Message_interactive_replySchema,
  Message_interactiveSchema,
  Message_mediaSchema,
  Message_statusesSchema,
  Message_template_components_parameters_actionSchema,
  Message_template_components_parametersSchema,
  Message_template_componentsSchema,
  Message_template_languageSchema,
  Message_templateSchema,
  Message_textSchema,
  MessageSchema,
  UserSchema,
} from "./models/data";
import { ConversationPage } from "./pages/ConversationPage";
import { ReportsPage } from "./pages/ReportsPage";

function App() {
  const isMobile = useMobile();
  const viewportHeight = useVisualViewportHeight();
  const [isMatch] = useRoute("/");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isMatch) {
      setLocation("/conversation");
    }
  }, [isMatch]);

  return (
    <Flex h={`${viewportHeight}px`} direction={isMobile ? "column" : "row"}>
      {!isMobile ? <LeftNavigation /> : <TopNavigation />}
      <ConversationPage />
      <ReportsPage />
    </Flex>
  );
}

export default function Home() {
  return (
    <MantineProvider>
      <FacebookProvider appId="1866926953815951">
        <AppProvider id="facebook-ckxlfbp">
          <UserProvider fallback={<LoginFacebook />}>
            <RealmProvider
              schema={[
                ConversationSchema,
                MessageSchema,
                Message_mediaSchema,
                Message_statusesSchema,
                Message_textSchema,
                Message_templateSchema,
                Message_template_componentsSchema,
                Message_template_components_parametersSchema,
                Message_template_components_parameters_actionSchema,
                Message_template_languageSchema,
                Message_interactiveSchema,
                Message_interactive_actionSchema,
                Message_interactive_headerSchema,
                Message_interactive_bodySchema,
                Message_interactive_footerSchema,
                Message_interactive_action_parametersSchema,
                Message_interactive_action_parameters_flow_action_payloadSchema,
                Message_interactive_replySchema,
                Message_interactive_metadataSchema,
                Message_interactive_reply_bookatableSchema,
                Message_interactive_reply_bookatable_commentSchema,
                Message_interactive_reply_bookatable_dateSchema,
                Message_interactive_reply_bookatable_timeSchema,
                Message_interactive_reply_bookatable_totalSchema,
                Message_interactive_reply_feedbackSchema,
                Message_interactive_reply_feedback_commentSchema,
                Message_interactive_reply_feedback_foodSchema,
                Message_interactive_reply_feedback_serviceSchema,
                UserSchema,
              ]}
              sync={{
                flexible: true,
                initialSubscriptions: {
                  update: (mutableSubs, realm) => {
                    mutableSubs.add(realm.objects(ConversationSchema.name));
                    mutableSubs.add(realm.objects(MessageSchema.name));
                    mutableSubs.add(realm.objects(UserSchema.name));
                  },
                },
              }}
            >
              <Router base="/whatsapp-superchat">
                <App />
              </Router>
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </FacebookProvider>
    </MantineProvider>
  );
}
