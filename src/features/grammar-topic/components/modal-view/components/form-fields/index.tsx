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
  onTitleChange: (title: string) => void;
}

export function FormFields({
  form,
  isViewMode,
  onTitleChange,
}: FormFieldsProps) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.title")} {t("common.form.required")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("field.title_placeholder")}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onTitleChange(e.target.value);
                  }}
                  disabled={isViewMode}
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
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.difficulty")} {t("common.form.required")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("field.difficulty_placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BEGINNER">
                    {t("common.difficulty.beginner")}
                  </SelectItem>
                  <SelectItem value="INTERMEDIATE">
                    {t("common.difficulty.intermediate")}
                  </SelectItem>
                  <SelectItem value="ADVANCED">
                    {t("common.difficulty.advanced")}
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="levelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.level")} {t("common.form.required")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("field.level_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Fetch levels from API */}
                  <SelectItem value="level-1">A1 - Beginner</SelectItem>
                  <SelectItem value="level-2">A2 - Elementary</SelectItem>
                  <SelectItem value="level-3">B1 - Intermediate</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grammarCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("field.grammar_category")} {t("common.form.required")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("field.grammar_category_placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Fetch grammar categories from API */}
                  <SelectItem value="cat-1">Các thì trong tiếng Anh</SelectItem>
                  <SelectItem value="cat-2">Câu điều kiện</SelectItem>
                  <SelectItem value="cat-3">Câu bị động</SelectItem>
                </SelectContent>
              </Select>
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
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!isViewMode && (
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
                !isViewMode && (
                  <FileUpload
                    onUploadSuccess={field.onChange}
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
                disabled={isViewMode}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("field.content")} {t("common.form.required")}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("field.content_placeholder")}
                rows={8}
                value={field.value ?? EMPTY.str}
                onChange={field.onChange}
                disabled={isViewMode}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
