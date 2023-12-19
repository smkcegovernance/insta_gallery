export type MessageDirection = "in" | "out";
export type MessageType = "text" | "image" | "link";

export type TMessage = {
  id: number;
  direction: MessageDirection;
  type: MessageType;
  text?: string;
};

export type TMessages = TMessage[];

export const DummyData: TMessages = [
  { id: 0, type: "text", direction: "in", text: "Hello" },
  { id: 1, type: "text", direction: "in", text: "Hello" },
  { id: 2, type: "text", direction: "in", text: "Hello" },
  { id: 3, type: "text", direction: "in", text: "Hello" },
];

export const newOutgoingTextMessage = (text: string): TMessage => ({
  id: Date.now(),
  direction: "out",
  type: "text",
  text: text,
});
