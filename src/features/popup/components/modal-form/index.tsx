import Image from "next/image";

import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { useGetModuleQuery } from "@/apis/hooks";
import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";
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

import { PopupFormValues } from "../../schemas";

export type PopupFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface PopupFormProps {
  form: UseFormReturn<PopupFormValues>;
  mode: PopupFormMode;
}

export function PopupForm({ form, mode }: PopupFormProps) {
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
              {t("field.popup_title")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("field.popup_title_placeholder")}
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
              {field.value ? (
                <div className="relative group w-fit">
                  <div className="w-[200px] h-[200px] rounded-lg border overflow-hidden bg-muted">
                    <Image
                      src={field.value}
                      alt="Preview"
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!isReadonly && (
                    <Button
                      type="button"
                      variant="default"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 cursor-pointer"
                      onClick={() => field.onChange(EMPTY.str)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                !isReadonly && (
                  <FileUpload
                    onUploadSuccess={(url) => {
                      field.onChange(url);
                    }}
                    onUploadError={EMPTY.fn}
                    accept="image/*"
                    maxSize={1024 * 1024}
                    multiple={false}
                  />
                )
              )}
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

export default PopupForm;
