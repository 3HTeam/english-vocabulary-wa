import { useTranslations } from "@/hooks";

export const MobileViewPlaceholder = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const t = useTranslations();
  const des = description || t("common.please_use_desktop_view_to_access_this_feature");

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/20">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{des}</p>
        </div>
      </div>
    </div>
  );
};