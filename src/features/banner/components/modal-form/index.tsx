import { UseFormReturn } from "react-hook-form";

import { useGetModuleQuery } from "@/apis/hooks";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import { BannerFormValues } from "../../schemas";

export type BannerFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface BannerFormProps {
  form: UseFormReturn<BannerFormValues>;
  mode: BannerFormMode;
}

export function BannerForm({ form, mode }: BannerFormProps) {
  const t = useTranslations();
  const isReadonly = mode === MODES.view;

  const { data: modulesData } = useGetModuleQuery({
    page: 1,
    isDeleted: false,
  });

  const modules = modulesData?.data?.modules || [];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.banner_title")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("field.banner_title_placeholder")}
                {...field}
                disabled={isReadonly}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="moduleId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.module")} {t("common.form.required")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isReadonly}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("field.module_placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("field.image")}</FormLabel>
            <FormControl>
              <Input
                placeholder="https://..."
                value={field.value ?? EMPTY.str}
                onChange={field.onChange}
                disabled={isReadonly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("field.description")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("field.description_placeholder")}
                rows={3}
                value={field.value ?? EMPTY.str}
                onChange={field.onChange}
                disabled={isReadonly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <FormLabel>{t("field.status")}</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isReadonly}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export default BannerForm;
