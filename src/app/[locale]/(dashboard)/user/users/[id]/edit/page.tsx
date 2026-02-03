"use client";

import { useParams } from "next/navigation";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { EditUserView } from "@/features/user/components";
import { useTranslations } from "@/hooks";

export default function EditUserPage() {
  const t = useTranslations();
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      {/* Mobile view placeholder */}
      <MobileViewPlaceholder title={t("user.edit_user")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <EditUserView id={id} />
      </div>
    </>
  );
}
