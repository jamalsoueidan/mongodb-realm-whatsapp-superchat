export type Message = {
  type: "text";
  text: {
    preview_url: boolean;
    body: string;
  };
};
