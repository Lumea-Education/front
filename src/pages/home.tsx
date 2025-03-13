import Cover from "../directories/home/cover";
import Learning from "../directories/home/learning";
import Connect from "../directories/home/connect";
import Achievements from "../directories/home/achievements";

export default function Home() {
  return (
    <section>
      <Cover />
      <Learning />
      <Connect />
      <Achievements />
    </section>
  );
}
