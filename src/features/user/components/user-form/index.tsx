"use client";

import { Upload, User, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { useGetLevelQuery } from "@/apis/hooks";
import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { TUser } from "@/types/features/user";

import { UserFormValues } from "../../schemas";

export type UserFormMode = typeof MODES.view | typeof MODES.edit;

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
  mode: UserFormMode;
  userData?: TUser;
}

export function UserForm({ form, mode }: UserFormProps) {
  const t = useTranslations();
  const { data: levels } = useGetLevelQuery();
  const isReadonly = mode === MODES.view;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t("user.avatar")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {field.value ? (
                    <div className="relative group flex justify-center">
                      <div className="w-48 h-48 rounded-full border-2 overflow-hidden bg-muted shadow-lg">
                        <img
                          src={field.value}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {!isReadonly && (
                        <Button
                          type="button"
                          variant="default"
                          size="icon"
                          className="absolute top-0 right-[calc(50%-6rem)] h-8 w-8 shadow-lg rounded-full"
                          onClick={() => field.onChange("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {!isReadonly ? (
                        <FileUpload
                          onUploadSuccess={(url: string) => field.onChange(url)}
                          accept="image/*"
                          maxSize={1024 * 1024}
                        />
                      ) : (
                        <div className="w-48 h-48 rounded-full border-2 bg-muted flex items-center justify-center mx-auto">
                          <User className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("user.general_info")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("field.full_name")} {t("common.form.required")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("field.full_name_placeholder")}
                        {...field}
                        disabled={isReadonly}
                        className="transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("field.email")} {t("common.form.required")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("field.email_placeholder")}
                        {...field}
                        disabled={true}
                        className="transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("field.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("field.phone_placeholder")}
                        {...field}
                        value={field.value || ""}
                        disabled={isReadonly}
                        className="transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("field.role")}</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={true}
                    >
                      <FormControl>
                        <SelectTrigger className="transition-all">
                          <SelectValue
                            placeholder={t("field.role_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            {t("user.role.user")}
                          </div>
                        </SelectItem>
                        <SelectItem value="ADMIN">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            {t("user.role.admin")}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("user.learning_progress")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="levelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        {t("field.level")}
                      </FormLabel>
                      <Select
                        key={`level-${field.value}-${levels?.data?.levels?.length}`}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                        disabled={isReadonly}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 w-full">
                            <SelectValue
                              placeholder={t("field.level_placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels?.data?.levels?.map((level: any) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
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
                  name="targetLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        {t("field.target_level")}
                      </FormLabel>
                      <Select
                        key={`target-${field.value}-${levels?.data?.levels?.length}`}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                        disabled={isReadonly}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 w-full">
                            <SelectValue
                              placeholder={t("field.target_level_placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels?.data?.levels?.map((level: any) => (
                            <SelectItem
                              key={level.id}
                              value={level.id}
                              disabled={level.id === form.watch("levelId")}
                            >
                              {level.name}
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
                  name="dailyGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        {t("field.daily_goal")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("field.daily_goal_placeholder")}
                          {...field}
                          disabled={isReadonly}
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="streak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        {t("field.streak")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("field.streak_placeholder")}
                          {...field}
                          disabled={true}
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("user.account_status")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="emailVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border-2 p-4 shadow-sm bg-gradient-to-br from-background to-muted/20">
                    <div className="space-y-0.5">
                      <FormLabel className="font-medium">
                        {t("field.email_verified")}
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        {t("user.email_verification_status")}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={isReadonly}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
