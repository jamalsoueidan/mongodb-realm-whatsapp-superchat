import Realm from "realm";

export type Conversation = {
  _id: Realm.BSON.ObjectId;
  business_phone_number_id: string;
  customer_phone_number: string;
  name?: string;
  timestamp: number;
  user_ids: Realm.List<string>;
};

export const ConversationSchema = {
  name: "Conversation",
  properties: {
    _id: "objectId",
    business_phone_number_id: "string",
    customer_phone_number: "string",
    name: "string?",
    timestamp: "double",
    user_ids: "string[]",
  },
  primaryKey: "_id",
};

export type Message = {
  _id: Realm.BSON.ObjectId;
  business_phone_number_id: string;
  conversation?: Conversation;
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
  hidden?: boolean;
  user?: User;
};

export const MessageSchema = {
  name: "Message",
  properties: {
    _id: "objectId",
    business_phone_number_id: "string",
    conversation: "Conversation",
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
    user: "User",
    hidden: "bool?",
  },
  primaryKey: "_id",
};

export type Message_interactive = {
  action?: Message_interactive_action;
  body?: Message_interactive_body;
  footer?: Message_interactive_footer;
  header?: Message_interactive_header;
  metadata?: Message_interactive_metadata;
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
    metadata: "Message_interactive_metadata",
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

export type Message_interactive_metadata = {
  id?: string;
  name?: string;
  status?: string;
};

export const Message_interactive_metadataSchema = {
  name: "Message_interactive_metadata",
  embedded: true,
  properties: {
    id: "string?",
    name: "string?",
    status: "string?",
  },
};

export type Message_interactive_reply = {
  bookatable?: Message_interactive_reply_bookatable;
  feedback?: Message_interactive_reply_feedback;
  flow_name?: string;
};

export const Message_interactive_replySchema = {
  name: "Message_interactive_reply",
  embedded: true,
  properties: {
    bookatable: "Message_interactive_reply_bookatable",
    feedback: "Message_interactive_reply_feedback",
    flow_name: "string?",
  },
};

export type Message_interactive_reply_bookatable = {
  comment?: Message_interactive_reply_bookatable_comment;
  date?: Message_interactive_reply_bookatable_date;
  flow_token?: string;
  time?: Message_interactive_reply_bookatable_time;
  total?: Message_interactive_reply_bookatable_total;
};

export const Message_interactive_reply_bookatableSchema = {
  name: "Message_interactive_reply_bookatable",
  embedded: true,
  properties: {
    comment: "Message_interactive_reply_bookatable_comment",
    date: "Message_interactive_reply_bookatable_date",
    flow_token: "string?",
    time: "Message_interactive_reply_bookatable_time",
    total: "Message_interactive_reply_bookatable_total",
  },
};

export type Message_interactive_reply_bookatable_comment = {
  question?: string;
  type?: string;
  value?: string;
};

export const Message_interactive_reply_bookatable_commentSchema = {
  name: "Message_interactive_reply_bookatable_comment",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "string?",
  },
};

export type Message_interactive_reply_bookatable_date = {
  question?: string;
  type?: string;
  value?: number;
};

export const Message_interactive_reply_bookatable_dateSchema = {
  name: "Message_interactive_reply_bookatable_date",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "double?",
  },
};

export type Message_interactive_reply_bookatable_time = {
  question?: string;
  type?: string;
  value?: string;
};

export const Message_interactive_reply_bookatable_timeSchema = {
  name: "Message_interactive_reply_bookatable_time",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "string?",
  },
};

export type Message_interactive_reply_bookatable_total = {
  question?: string;
  type?: string;
  value?: number;
};

export const Message_interactive_reply_bookatable_totalSchema = {
  name: "Message_interactive_reply_bookatable_total",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "double?",
  },
};

export type Message_interactive_reply_feedback = {
  comment?: Message_interactive_reply_feedback_comment;
  flow_token?: string;
  food?: Message_interactive_reply_feedback_food;
  service?: Message_interactive_reply_feedback_service;
};

export const Message_interactive_reply_feedbackSchema = {
  name: "Message_interactive_reply_feedback",
  embedded: true,
  properties: {
    comment: "Message_interactive_reply_feedback_comment",
    flow_token: "string?",
    food: "Message_interactive_reply_feedback_food",
    service: "Message_interactive_reply_feedback_service",
  },
};

export type Message_interactive_reply_feedback_comment = {
  question?: string;
  type?: string;
  value?: string;
};

export const Message_interactive_reply_feedback_commentSchema = {
  name: "Message_interactive_reply_feedback_comment",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "string?",
  },
};

export type Message_interactive_reply_feedback_food = {
  question?: string;
  type?: string;
  value?: number;
};

export const Message_interactive_reply_feedback_foodSchema = {
  name: "Message_interactive_reply_feedback_food",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "double?",
  },
};

export type Message_interactive_reply_feedback_service = {
  question?: string;
  type?: string;
  value?: number;
};

export const Message_interactive_reply_feedback_serviceSchema = {
  name: "Message_interactive_reply_feedback_service",
  embedded: true,
  properties: {
    question: "string?",
    type: "string?",
    value: "double?",
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

export type UserConversation = {
  _id: Realm.BSON.ObjectId;
  user?: User;
  conversation?: Conversation;
  last_seen_at: number;
};

export const UserConversationSchema = {
  name: "UserConversation",
  properties: {
    _id: "objectId",
    user: "User",
    conversation: "Conversation",
    last_seen_at: "double",
  },
  primaryKey: "_id",
};

export type User = {
  _id: Realm.BSON.ObjectId;
  business_phone_number_ids: Realm.List<string>;
  email: string;
  is_admin: boolean;
  is_team_admin: boolean;
  name: string;
  picture?: string;
  user_id: string;
  created_at?: number;
  updated_at?: number;
};

export const UserSchema = {
  name: "User",
  properties: {
    _id: "objectId",
    business_phone_number_ids: "string[]",
    email: "string",
    is_admin: "bool",
    is_team_admin: "bool",
    name: "string",
    picture: "string?",
    user_id: "string",
    created_at: "double?",
    updated_at: "double?",
  },
  primaryKey: "_id",
};
