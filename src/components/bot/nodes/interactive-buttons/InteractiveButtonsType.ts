import { InteractiveTrigger } from "../../NodeWrapper";

export type InteractiveButtons = InteractiveTrigger & {
  whatsapp: {
    type: string;
    interactive: {
      type: "button";
      header: {
        type: "text"; //can be image, and other type
        text: string;
      };
      body: {
        text: string;
      };
      footer: {
        text: string;
      };
      action: {
        buttons: Array<{
          type: "reply";
          reply: {
            id: string;
            title: string;
          };
        }>;
      };
    };
  };
};
