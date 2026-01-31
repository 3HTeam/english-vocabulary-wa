"use client";

import Image from "next/image";



import { Icon } from "@iconify/react";
import { Mail, MapPin, Palette, Phone, Settings, Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";



import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorPicker, ColorPickerArea, ColorPickerContent, ColorPickerEyeDropper, ColorPickerHueSlider, ColorPickerInput, ColorPickerSwatch, ColorPickerTrigger } from "@/components/ui/color-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";



import { SettingFormValues } from "../../schema";


interface SettingFormProps {
  form: UseFormReturn<SettingFormValues>;
  isReadonly?: boolean;
}

export function SettingForm({ form, isReadonly = false }: SettingFormProps) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              {t("setting.app_info")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("setting.app_name")} {t("common.form.required")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("setting.app_name_placeholder")}
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
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("setting.primary_color")} {t("common.form.required")}
                  </FormLabel>
                  <FormControl>
                    <ColorPicker
                      value={field.value || "#3b82f6"}
                      onValueChange={field.onChange}
                      defaultFormat="hex"
                      disabled={isReadonly}
                    >
                      <ColorPickerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 cursor-pointer"
                          disabled={isReadonly}
                        >
                          <ColorPickerSwatch className="size-5 rounded" />
                          <span className="font-mono text-sm">
                            {field.value || "#3b82f6"}
                          </span>
                        </Button>
                      </ColorPickerTrigger>
                      <ColorPickerContent>
                        <ColorPickerArea />
                        <div className="flex items-center gap-2">
                          <ColorPickerEyeDropper />
                          <ColorPickerHueSlider className="flex-1" />
                        </div>
                        <ColorPickerInput />
                      </ColorPickerContent>
                    </ColorPicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("setting.app_description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("setting.app_description_placeholder")}
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                      className="min-h-[100px] transition-all focus-visible:ring-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              {t("setting.contact_info")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t("field.email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("field.email_placeholder")}
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t("field.phone")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("field.phone_placeholder")}
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t("setting.address")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("setting.address_placeholder")}
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Logo & Favicon Card */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-4 h-4 text-primary" />
              {t("setting.logo")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {field.value ? (
                      <div className="relative group">
                        <div className="aspect-video w-full rounded-lg border overflow-hidden bg-muted flex items-center justify-center">
                          <Image
                            src={field.value}
                            alt="Logo"
                            width={200}
                            height={100}
                            className="object-contain max-h-full"
                          />
                        </div>
                        {!isReadonly && (
                          <Button
                            type="button"
                            variant="default"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7"
                            onClick={() => field.onChange(EMPTY.str)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      !isReadonly && (
                        <FileUpload
                          onUploadSuccess={(url) => field.onChange(url)}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="w-4 h-4 text-primary" />
              {t("setting.favicon")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="faviconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {field.value ? (
                      <div className="relative group">
                        <div className="aspect-video w-full rounded-lg border overflow-hidden bg-muted flex items-center justify-center">
                          <Image
                            src={field.value}
                            alt="Favicon"
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        {!isReadonly && (
                          <Button
                            type="button"
                            variant="default"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7"
                            onClick={() => field.onChange(EMPTY.str)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      !isReadonly && (
                        <FileUpload
                          onUploadSuccess={(url) => field.onChange(url)}
                          onUploadError={EMPTY.fn}
                          accept="image/*"
                          maxSize={512 * 1024}
                          multiple={false}
                        />
                      )
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="ion:social-rss" />
            {t("setting.social_media")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Icon icon="logos:facebook" />
                    Facebook
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://facebook.com/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Icon icon="prime:twitter" />X
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://x.com/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Icon icon="skill-icons:instagram" />
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Icon icon="logos:youtube-icon" />
                    YouTube
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]">
                  <FormLabel className="flex items-center gap-2">
                    <Icon icon="logos:tiktok-icon" />
                    TikTok
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://tiktok.com/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isReadonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}