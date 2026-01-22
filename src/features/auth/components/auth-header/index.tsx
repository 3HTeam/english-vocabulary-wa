"use client";

import Image from "next/image";

import { Logo } from "@/assets/images";
import { Link } from "@/i18n/routing";
import { ROUTE_PATH } from "@/constants/routes";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {

  return (
    <>
      <div className="flex justify-center">
        <Link
          href={ROUTE_PATH.public.home}
          className="flex items-center gap-2 font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-md">
            <Image
              src={Logo}
              alt="Logo"
              width={75}
              height={75}
              className="object-cover rounded-md"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {description}
        </p>
      </div>
    </>
  );
}
