import Cover from "../directories/educators/cover";
import Expertise from "../directories/educators/expertise";
import Lessons from "../directories/educators/lessons";
import Mentorship from "../directories/educators/mentorship";
import Struggle from "../directories/educators/struggle";
import Thrive from "../directories/educators/thrive";

export default function Educators() {
  return (
    <section>
      <Cover />
      <Lessons />
      <Struggle />
      <Mentorship />
      <Expertise />
      <Thrive />
    </section>
  );
}
