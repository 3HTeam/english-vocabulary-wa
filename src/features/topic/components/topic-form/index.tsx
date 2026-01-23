"use client";

import Image from "next/image";

import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import { type TopicFormValues } from "../../schemas";

export type TopicFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface TopicFormProps {
  form: UseFormReturn<TopicFormValues>;
  mode: TopicFormMode;
  onNameChange?: (name: string) => void;
}

export function TopicForm({ form, mode, onNameChange }: TopicFormProps) {
  const t = useTranslations();
  const isReadonly = mode === MODES.view;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.topic_name")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("field.topic_name_placeholder")}
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
                {t("field.slug")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("field.slug_placeholder")}
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
              {t("field.image")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              {field.value ? (
                <div className="relative group w-fit">
                  <div className="w-[200px] h-[200px] rounded-lg border overflow-hidden bg-muted">
                    <Image
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
