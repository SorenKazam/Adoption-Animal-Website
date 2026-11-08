import styles from "./Skeleton.module.scss";

type SkeletonVariant = "text" | "title" | "button" | "avatar" | "image";

type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
};

const VARIANTS: Record<
  SkeletonVariant,
  { width: string; height: string; radius: string }
> = {
  text: {
    width: "100%",
    height: "16px",
    radius: "999px",
  },
  title: {
    width: "60%",
    height: "40px",
    radius: "12px",
  },
  button: {
    width: "180px",
    height: "48px",
    radius: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    radius: "999px",
  },
  image: {
    width: "100%",
    height: "300px",
    radius: "16px",
  },
};

export default function Skeleton({
  variant,
  width,
  height,
  radius,
  className,
}: SkeletonProps) {
  const preset = variant ? VARIANTS[variant] : null;

  return (
    <div
      className={`${styles.skeleton} ${className ?? ""}`}
      style={{
        width: width || preset?.width,
        height: height || preset?.height,
        borderRadius: radius || preset?.radius,
      }}
    />
  );
}
