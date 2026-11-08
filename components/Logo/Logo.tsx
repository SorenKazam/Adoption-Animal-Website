import LogoImage from "@/public/ADOPTION-LOGO.svg";
import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
  draggable?: boolean;
};

export default function Logo({ size, className, draggable }: LogoProps) {
  //Default logo size
  if (!size) {
    size = 50;
  }

  return (
    <Image
      src={LogoImage}
      alt={"ADOPTION Logo"}
      width={size}
      height={size}
      className={className}
      draggable={draggable}
      priority
      loading="eager"
    />
  );
}
