import "@mantine/charts/styles.css";
import { Flex, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useViewportSize } from "@mantine/hooks";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { useEffect } from "react";
import { FacebookProvider } from "react-facebook";
import { Router, useLocation, useRoute } from "wouter";
import "./app.css";
import { BottomNavigation } from "./components/BottomNavigation";
import { LeftNavigation } from "./components/LeftNavigation";
import { LoginFacebook } from "./components/Login";
import { TopNavigation } from "./components/TopNavigation";
import { useMobile } from "./hooks/useMobile";
import {
  ConversationSchema,
  CustomerBotSchema,
  Message_interactive_action_buttons_replySchema,
  Message_interactive_action_buttonsSchema,
  Message_interactive_action_parameters_flow_action_payloadSchema,
  Message_interactive_action_parametersSchema,
  Message_interactive_action_sections_rowsSchema,
  Message_interactive_action_sectionsSchema,
  Message_interactive_actionSchema,
  Message_interactive_bodySchema,
  Message_interactive_footerSchema,
  Message_interactive_headerSchema,
  Message_interactive_reply_bookatable_commentSchema,
  Message_interactive_reply_bookatable_dateSchema,
  Message_interactive_reply_bookatable_timeSchema,
  Message_interactive_reply_bookatable_totalSchema,
  Message_interactive_reply_bookatableSchema,
  Message_interactive_reply_button_replySchema,
  Message_interactive_reply_feedback_commentSchema,
  Message_interactive_reply_feedback_foodSchema,
  Message_interactive_reply_feedback_serviceSchema,
  Message_interactive_reply_feedbackSchema,
  Message_interactive_reply_list_replySchema,
  Message_interactive_replySchema,
  Message_interactiveSchema,
  Message_locationSchema,
  Message_mediaSchema,
  Message_statusesSchema,
  Message_template_components_parameters_actionSchema,
  Message_template_components_parametersSchema,
  Message_template_componentsSchema,
  Message_template_languageSchema,
  Message_templateSchema,
  Message_textSchema,
  MessageSchema,
  UserConversationSchema,
  UserSchema,
} from "./models/data";
import { BotPage } from "./pages/BotPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ReportsPage } from "./pages/ReportsPage";
import { TeamPage } from "./pages/TeamPage";

function App() {
  const isMobile = useMobile();
  const { height } = useViewportSize();
  const [isMatch] = useRoute("/");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isMatch) {
      setLocation("/bot");
    }
  }, [isMatch, setLocation]);

  return (
    <Flex h={`${height}px`} direction={isMobile ? "column" : "row"}>
      {!isMobile ? <LeftNavigation /> : <TopNavigation />}
      <ConversationPage />
      <ReportsPage />
      <TeamPage />
      <BotPage />
      {!isMobile ? null : <BottomNavigation />}
    </Flex>
  );
}

export default function Home() {
  return (
    <MantineProvider>
      <Router base={`/${import.meta.env.VITE_BASE_URL}`}>
        <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APPID}>
          <AppProvider id={import.meta.env.VITE_MONGODB_APPID}>
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
                  Message_interactive_action_buttonsSchema,
                  Message_interactive_action_buttons_replySchema,
                  Message_interactive_headerSchema,
                  Message_interactive_bodySchema,
                  Message_interactive_footerSchema,
                  Message_interactive_action_parametersSchema,
                  Message_interactive_action_parameters_flow_action_payloadSchema,
                  Message_interactive_action_sectionsSchema,
                  Message_interactive_action_sections_rowsSchema,
                  Message_interactive_reply_list_replySchema,
                  Message_interactive_replySchema,
                  Message_interactive_reply_bookatableSchema,
                  Message_interactive_reply_bookatable_commentSchema,
                  Message_interactive_reply_bookatable_dateSchema,
                  Message_interactive_reply_bookatable_timeSchema,
                  Message_interactive_reply_bookatable_totalSchema,
                  Message_interactive_reply_feedbackSchema,
                  Message_interactive_reply_feedback_commentSchema,
                  Message_interactive_reply_feedback_foodSchema,
                  Message_interactive_reply_feedback_serviceSchema,
                  Message_interactive_reply_button_replySchema,
                  UserConversationSchema,
                  UserSchema,
                  CustomerBotSchema,
                  Message_locationSchema,
                ]}
                sync={{
                  flexible: true,
                  initialSubscriptions: {
                    update: (mutableSubs, realm) => {
                      mutableSubs.add(realm.objects(ConversationSchema.name));
                      mutableSubs.add(realm.objects(MessageSchema.name));
                      mutableSubs.add(realm.objects(UserSchema.name));
                      mutableSubs.add(
                        realm.objects(UserConversationSchema.name)
                      );
                      mutableSubs.add(realm.objects(CustomerBotSchema.name));
                    },
                  },
                }}
              >
                <App />
              </RealmProvider>
            </UserProvider>
          </AppProvider>
        </FacebookProvider>
      </Router>
    </MantineProvider>
  );
}
