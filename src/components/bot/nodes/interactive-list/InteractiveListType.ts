export type InteractiveList = {
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
        button: string;
        sections: Array<{
          title: string;
          rows: Array<{
            id: string;
            title: string;
            description: string;
          }>;
        }>;
      };
    };
  };
};
