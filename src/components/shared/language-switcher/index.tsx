"use client";

import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/common";
import { LANGUAGES } from "@/constants/i18n";

interface LanguageSwitcherProps {
  variant?: "outline" | "ghost" | "default";
}

export const LanguageSwitcher = ({
  variant = "outline",
}: LanguageSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className="cursor-pointer mode-toggle-button relative overflow-hidden"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.key}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleLanguageChange(lang.key)}
          >
            <p>
              <span className={locale === lang.key ? "font-bold" : EMPTY.str}>
                {lang.name}
              </span>{" "}
              <span role="img" aria-label={lang.name}>
                {lang.flag}
              </span>
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
