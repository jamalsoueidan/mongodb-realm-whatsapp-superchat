export type Message = {
  whatsapp: {
    type: "text";
    text: {
      preview_url: boolean;
      body: string;
    };
  };
};
