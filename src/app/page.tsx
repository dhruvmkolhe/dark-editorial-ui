import { InteractiveWall } from "@/components/interactive-wall";
import { initialEntries } from "@/lib/initial-entries";

export default function HomePage() {
  return <InteractiveWall initialEntries={initialEntries} />;
}
