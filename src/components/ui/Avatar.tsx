import Image from "next/image";
import clsx from "clsx";
import React from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  image?: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

const sizePx: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

export function Avatar({ name, image, size = "md", className, ...props }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {image ? (
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes={`${sizePx[size]}px`}
            unoptimized
          />
        </div>
      ) : (
        <span className="font-semibold">{initials}</span>
      )}
    </div>
  );
}
