import { StyleProvider } from "@/lib/StyleContext";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <StyleProvider>
      <MainContent />
    </StyleProvider>
  );
}
