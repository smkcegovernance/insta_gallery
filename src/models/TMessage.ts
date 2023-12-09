export type MessageDirection = "in" | "out";
export type MessageType = "text" | "image" | "link";

export type TMessage = {
  direction: MessageDirection;
  type: MessageType;
};
