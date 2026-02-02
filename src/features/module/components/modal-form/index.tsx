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

import { ModuleFormValues } from "../../schemas";

export type ModuleFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface ModuleFormProps {
  form: UseFormReturn<ModuleFormValues>;
  mode: ModuleFormMode;
}

export function ModuleForm({ form, mode }: ModuleFormProps) {
  const t = useTranslations();
  const isReadonly = mode === MODES.view;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.module_name")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("field.topic_name_placeholder")}
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

export default ModuleForm;
