import ChatHelp from "../components/ChatHelp";
import ChatInput from "../components/ChatInput";

export default function Home() {
  return (
    <main>
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <h1 className="text-xl">What can i help with?</h1>
        <ChatInput id=""/>
        <ChatHelp />
      </div>
    </main>
  );
}

