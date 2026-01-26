"use client";

import { UseFormReturn } from "react-hook-form";

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

import { type LevelFormValues } from "../../schemas";

export type LevelFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface LevelFormProps {
  form: UseFormReturn<LevelFormValues>;
  mode: LevelFormMode;
}

export function LevelForm({ form, mode }: LevelFormProps) {
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
                {t("field.level_name")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("field.level_name_placeholder")}
                  {...field}
                  disabled={isReadonly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.code")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("field.code_placeholder")}
                  {...field}
                  disabled={isReadonly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.order")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("field.order_placeholder")}
                  {...field}
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
            <FormItem className="flex items-center justify-between space-x-2 mt-8 border p-2 rounded-lg">
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
    </div>
  );
}
