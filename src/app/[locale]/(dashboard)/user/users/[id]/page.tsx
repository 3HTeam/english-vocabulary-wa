"use client";

import { useParams } from "next/navigation";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { UserDetailView } from "@/features/user/components";
import { useTranslations } from "@/hooks";

export default function UserDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      {/* Mobile view placeholder */}
      <MobileViewPlaceholder title={t("user.user_details")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <UserDetailView id={id} />
      </div>
    </>
  );
}
