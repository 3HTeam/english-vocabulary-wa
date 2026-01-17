"use client";

import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/shared/file-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { type TopicFormValues } from "../schemas/topic.schema";
import { useTranslations } from "@/hooks";

export type TopicFormMode = "add" | "view" | "edit";

interface TopicFormProps {
  form: UseFormReturn<TopicFormValues>;
  mode: TopicFormMode;
  onNameChange?: (name: string) => void;
}

export function TopicForm({ form, mode, onNameChange }: TopicFormProps) {
  const t = useTranslations();
  const isReadonly = mode === "view";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("topic.form.name")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("topic.form.name_placeholder")}
                  {...field}
                  disabled={isReadonly}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    onNameChange?.(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("topic.form.slug")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("topic.form.slug_placeholder")}
                  {...field}
                  disabled={isReadonly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("topic.form.image")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              {field.value ? (
                <div className="relative group w-fit">
                  <div className="w-[200px] h-[200px] rounded-lg border overflow-hidden bg-muted">
                    <img
                      src={field.value}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!isReadonly && (
                    <Button
                      type="button"
                      variant="default"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 cursor-pointer"
                      onClick={() => field.onChange("")}
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
                    onUploadError={() => {}}
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
            <FormLabel>{t("common.form.description")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("topic.form.description_placeholder")}
                rows={3}
                value={field.value ?? ""}
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
              <FormLabel>{t("common.status.label")}</FormLabel>
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
