export type InteractiveFlow = {
  whatsapp: {
    type: string;
    interactive: {
      type: string;
      header: {
        type: string;
        text: string;
      };
      body: {
        text: string;
      };
      footer: {
        text: string;
      };
      action: {
        name: string;
        parameters: {
          flow_message_version: string;
          flow_token: string;
          flow_id?: string;
          mode: string;
          flow_cta: string;
          flow_action: string;
          flow_action_payload: {
            screen: string;
          };
        };
      };
    };
  };
};
