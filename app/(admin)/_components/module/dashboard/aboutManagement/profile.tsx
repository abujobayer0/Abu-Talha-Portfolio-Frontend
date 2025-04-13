import About from "./about";

import { getAllAbout } from "@/service/aboutService/aboutService";

export default async function Profile() {
  const aboutData = await getAllAbout();
  const about = aboutData?.data;

  console.log(about);

  return (
    <div>
      <About about={about} />
    </div>
  );
}
