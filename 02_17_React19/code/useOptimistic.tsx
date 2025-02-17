import { useOptimistic, useState, useRef } from "react";

async function deliverMessage(message: string) {
  await new Promise((res, rej) => setTimeout(res, 1000));
  return message;
}

interface ThreadProps {
  messages: MessageState[];
  sendMessage: (formData: FormData) => Promise<void>;
}

function Thread({ messages, sendMessage }: ThreadProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: MessageState[], newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);
    formRef.current!.reset();
    try {
      await sendMessage(formData);
    } catch {
      alert("Failed to send message");
    }
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button
          type="submit"
          disabled={optimisticMessages.some((message) => message.sending)}
        >
          Send
        </button>
      </form>
    </>
  );
}

interface MessageState {
  text: string;
  sending?: boolean;
  key?: number;
}

export default function App() {
  const [messages, setMessages] = useState<MessageState[]>([
    { text: "Hello there!", sending: false, key: 1 },
  ]);

  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message") as string);
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
