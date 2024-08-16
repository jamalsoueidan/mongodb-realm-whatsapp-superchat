import Realm from "realm";

export type Conversation = {
  _id: Realm.BSON.ObjectId;
  business_phone_number_id: string;
  customer_phone_number: string;
  name?: string;
  timestamp: number;
};

export const ConversationSchema = {
  name: "Conversation",
  properties: {
    _id: "objectId",
    business_phone_number_id: "string",
    customer_phone_number: "string",
    name: "string?",
    timestamp: "double",
  },
  primaryKey: "_id",
};

export type Message = {
  _id: Realm.BSON.ObjectId;
  business_phone_number_id: string;
  conversation?: Conversation;
  user?: User;
  interactive?: Message_interactive;
  interactive_reply?: Message_interactive_reply;
  media?: Message_media;
  message_id: string;
  recipient: string;
  reply?: Message;
  statuses: Realm.List<Message_statuses>;
  template?: Message_template;
  text?: Message_text;
  timestamp: number;
  type: string;
};

export const MessageSchema = {
  name: "Message",
  properties: {
    _id: "objectId",
    business_phone_number_id: "string",
    conversation: "Conversation",
    user: "User",
    interactive: "Message_interactive",
    interactive_reply: "Message_interactive_reply",
    media: "Message_media",
    message_id: "string",
    recipient: "string",
    reply: "Message",
    statuses: "Message_statuses[]",
    template: "Message_template",
    text: "Message_text",
    timestamp: "double",
    type: "string",
  },
  primaryKey: "_id",
};

export type Message_interactive = {
  action?: Message_interactive_action;
  body?: Message_interactive_body;
  footer?: Message_interactive_footer;
  header?: Message_interactive_header;
  type?: string;
};

export const Message_interactiveSchema = {
  name: "Message_interactive",
  embedded: true,
  properties: {
    action: "Message_interactive_action",
    body: "Message_interactive_body",
    footer: "Message_interactive_footer",
    header: "Message_interactive_header",
    type: "string?",
  },
};

export type Message_interactive_action = {
  name?: string;
  parameters?: Message_interactive_action_parameters;
};

export const Message_interactive_actionSchema = {
  name: "Message_interactive_action",
  embedded: true,
  properties: {
    name: "string?",
    parameters: "Message_interactive_action_parameters",
  },
};

export type Message_interactive_action_parameters = {
  flow_action?: string;
  flow_action_payload?: Message_interactive_action_parameters_flow_action_payload;
  flow_cta?: string;
  flow_id?: string;
  flow_message_version?: string;
  flow_token?: string;
  mode?: string;
};

export const Message_interactive_action_parametersSchema = {
  name: "Message_interactive_action_parameters",
  embedded: true,
  properties: {
    flow_action: "string?",
    flow_action_payload:
      "Message_interactive_action_parameters_flow_action_payload",
    flow_cta: "string?",
    flow_id: "string?",
    flow_message_version: "string?",
    flow_token: "string?",
    mode: "string?",
  },
};

export type Message_interactive_action_parameters_flow_action_payload = {
  screen?: string;
};

export const Message_interactive_action_parameters_flow_action_payloadSchema = {
  name: "Message_interactive_action_parameters_flow_action_payload",
  embedded: true,
  properties: {
    screen: "string?",
  },
};

export type Message_interactive_body = {
  text?: string;
};

export const Message_interactive_bodySchema = {
  name: "Message_interactive_body",
  embedded: true,
  properties: {
    text: "string?",
  },
};

export type Message_interactive_footer = {
  text?: string;
};

export const Message_interactive_footerSchema = {
  name: "Message_interactive_footer",
  embedded: true,
  properties: {
    text: "string?",
  },
};

export type Message_interactive_header = {
  text?: string;
  type?: string;
};

export const Message_interactive_headerSchema = {
  name: "Message_interactive_header",
  embedded: true,
  properties: {
    text: "string?",
    type: "string?",
  },
};

export type Message_interactive_reply = {
  body?: string;
  name?: string;
  response_json?: Message_interactive_reply_response_json;
};

export const Message_interactive_replySchema = {
  name: "Message_interactive_reply",
  embedded: true,
  properties: {
    body: "string?",
    name: "string?",
    response_json: "Message_interactive_reply_response_json",
  },
};

export type Message_interactive_reply_response_json = {
  comment?: string;
  date?: number;
  flow_token?: string;
  food?: number;
  service?: number;
  time?: string;
  total?: number;
};

export const Message_interactive_reply_response_jsonSchema = {
  name: "Message_interactive_reply_response_json",
  embedded: true,
  properties: {
    comment: "string?",
    date: "double?",
    flow_token: "string?",
    food: "double?",
    service: "double?",
    time: "string?",
    total: "double?",
  },
};

export type Message_media = {
  file_name?: string;
  file_size?: number;
  id?: string;
  messaging_product?: string;
  mime_type?: string;
  sha256?: string;
  signed_url?: string;
  signed_url_timestamp?: number;
  url?: string;
};

export const Message_mediaSchema = {
  name: "Message_media",
  embedded: true,
  properties: {
    file_name: "string?",
    file_size: "double?",
    id: "string?",
    messaging_product: "string?",
    mime_type: "string?",
    sha256: "string?",
    signed_url: "string?",
    signed_url_timestamp: "double?",
    url: "string?",
  },
};

export type Message_statuses = {
  status?: string;
  timestamp?: number;
};

export const Message_statusesSchema = {
  name: "Message_statuses",
  embedded: true,
  properties: {
    status: "string?",
    timestamp: "double?",
  },
};

export type Message_template = {
  components: Realm.List<Message_template_components>;
  language?: Message_template_language;
  name?: string;
};

export const Message_templateSchema = {
  name: "Message_template",
  embedded: true,
  properties: {
    components: "Message_template_components[]",
    language: "Message_template_language",
    name: "string?",
  },
};

export type Message_template_components = {
  index?: string;
  parameters: Realm.List<Message_template_components_parameters>;
  sub_type?: string;
  type?: string;
};

export const Message_template_componentsSchema = {
  name: "Message_template_components",
  embedded: true,
  properties: {
    index: "string?",
    parameters: "Message_template_components_parameters[]",
    sub_type: "string?",
    type: "string?",
  },
};

export type Message_template_components_parameters = {
  action?: Message_template_components_parameters_action;
  type?: string;
};

export const Message_template_components_parametersSchema = {
  name: "Message_template_components_parameters",
  embedded: true,
  properties: {
    action: "Message_template_components_parameters_action",
    type: "string?",
  },
};

export type Message_template_components_parameters_action = {
  flow_token?: string;
};

export const Message_template_components_parameters_actionSchema = {
  name: "Message_template_components_parameters_action",
  embedded: true,
  properties: {
    flow_token: "string?",
  },
};

export type Message_template_language = {
  code?: string;
};

export const Message_template_languageSchema = {
  name: "Message_template_language",
  embedded: true,
  properties: {
    code: "string?",
  },
};

export type Message_text = {
  body?: string;
  preview_url?: boolean;
};

export const Message_textSchema = {
  name: "Message_text",
  embedded: true,
  properties: {
    body: "string?",
    preview_url: "bool?",
  },
};

export type User = {
  _id: Realm.BSON.ObjectId;
  user_id: string;
  business_phone_number_ids: Realm.List<string>;
  conversation_ids: Realm.List<Realm.BSON.ObjectId>;
  email: string;
  is_admin: boolean;
  is_team_admin: boolean;
  name: string;
  picture?: string;
};

export const UserSchema = {
  name: "User",
  properties: {
    _id: "objectId",
    user_id: "string",
    business_phone_number_ids: "string[]",
    conversation_ids: "objectId[]",
    email: "string",
    is_admin: "bool",
    is_team_admin: "bool",
    name: "string",
    picture: "string?",
  },
  primaryKey: "_id",
};
