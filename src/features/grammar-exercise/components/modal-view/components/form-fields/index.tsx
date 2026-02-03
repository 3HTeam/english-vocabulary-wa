import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

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
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";

import { FormValues } from "../../schemas";

interface FormFieldsProps {
  form: UseFormReturn<FormValues>;
  isViewMode: boolean;
}

export function FormFields({ form, isViewMode }: FormFieldsProps) {
  const t = useTranslations();

  const addOption = () => {
    const currentOptions = form.getValues("options.options");
    form.setValue("options.options", [...currentOptions, EMPTY.str]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options.options");
    if (currentOptions.length > 1) {
      form.setValue(
        "options.options",
        currentOptions.filter((_, i) => i !== index),
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.exercise_type")} {t("common.form.required")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("field.exercise_type_placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MULTIPLE_CHOICE">
                    {t("common.exercise_type.multiple_choice")}
                  </SelectItem>
                  <SelectItem value="FILL_IN_THE_BLANK">
                    {t("common.exercise_type.fill_in_the_blank")}
                  </SelectItem>
                  <SelectItem value="TRUE_FALSE">
                    {t("common.exercise_type.true_false")}
                  </SelectItem>
                  <SelectItem value="MATCHING">
                    {t("common.exercise_type.matching")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.score")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("field.score_placeholder")}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="grammarTopicId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.grammar_topic")} {t("common.form.required")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isViewMode}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("field.grammar_topic_placeholder")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* TODO: Fetch grammar topics from API */}
                <SelectItem value="topic-1">Thì hiện tại đơn</SelectItem>
                <SelectItem value="topic-2">Thì quá khứ đơn</SelectItem>
                <SelectItem value="topic-3">Thì hiện tại hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.question")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("field.question_placeholder")}
                rows={3}
                {...field}
                disabled={isViewMode}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.answer")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("field.answer_placeholder")}
                {...field}
                disabled={isViewMode}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FormLabel>
            {t("field.options")} {t("common.form.required")}
          </FormLabel>
          {!isViewMode && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1" />
              {t("common.actions.add_option")}
            </Button>
          )}
        </div>

        {form.watch("options.options").map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`options.options.${index}`}
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder={`${t("field.option")} ${index + 1}`}
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  {!isViewMode && form.watch("options.options").length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeOption(index)}
                      className="cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <FormField
        control={form.control}
        name="explanation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.explanation")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("field.explanation_placeholder")}
                rows={4}
                {...field}
                disabled={isViewMode}
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
                disabled={isViewMode}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
