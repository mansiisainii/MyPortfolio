import { Icon } from "lucide-react";
import { OrbitingCircles } from "./OrbitingCircles";
export function Frameworks() {
  const skills = [
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "tailwindcss",
    "html5",
    "javascript",
    "css3",

    "MySQL",
    "PostgresSQL",
"aws_icon_146074",
"azure",
    "Socket.io",

    "threejs",
  ];

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center ">
      <OrbitingCircles iconSize={25}>
        {skills.map((skill, index) => (
          <Icons key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={30}
        radius={100}
        reverse
        speed={2}
      >
        {skills.reverse().map((skill, index) => (
          <Icons key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icons = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
