"use client";

import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/shared/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";

import {
  topicSchema,
  type TopicFormValues,
  topicDefaultValues,
} from "../schemas/topic.schema";
import {
  useGetTopicByIdQuery,
  useUpdateTopicMutation,
} from "@/apis/queries/topic";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api/base";

interface ViewEditTopicModalProps {
  topicId: string | null;
  mode: "view" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewEditTopicModal({
  topicId,
  mode,
  open: controlledOpen,
  onOpenChange,
}: ViewEditTopicModalProps) {
  const {
    data: topicData,
    isLoading,
    isError,
  } = useGetTopicByIdQuery(topicId || "");
  const { mutate: updateTopic } = useUpdateTopicMutation();

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: topicDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form;

  // Load data vào form khi có dữ liệu
  useEffect(() => {
    if (topicData?.data?.topic && controlledOpen) {
      const topic = topicData.data.topic;
      reset({
        name: topic.name,
        imageUrl: topic.imageUrl,
        slug: topic.slug,
        description: topic.description || "",
        status: topic.status,
      });
    }
  }, [topicData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(topicDefaultValues);
    }
  }, [controlledOpen, reset]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    if (mode === "view") {
      return;
    }
    updateTopic(
      {
        id: topicId || "",
        payload: {
          name: values.name,
          imageUrl: values.imageUrl,
          slug: values.slug,
          description: values.description || "",
          status: values.status,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Cập nhật chủ đề thành công!");
          onOpenChange?.(false);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || "Cập nhật chủ đề thất bại, vui lòng thử lại.";
          toast.error(message || fallbackMessage);
        },
      }
    );
  };

  const handleCancel = () => {
    reset(topicDefaultValues);
    onOpenChange?.(false);
  };

  const isReadonly = mode === "view";

  if (isError) {
    return (
      <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
        <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {mode === "view" ? "Xem chủ đề" : "Chỉnh sửa chủ đề"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-destructive">
            Không thể tải thông tin chủ đề. Vui lòng thử lại.
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? "Xem chủ đề" : "Chỉnh sửa chủ đề"}
          </DialogTitle>
          <DialogDescription>
            {mode === "view"
              ? "Xem thông tin chi tiết của chủ đề."
              : "Chỉnh sửa thông tin chủ đề. Điền thông tin bên dưới."}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chủ đề *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên chủ đề..."
                          {...field}
                          disabled={isReadonly}
                          onChange={(e) => {
                            if (!isReadonly) {
                              const value = e.target.value;
                              field.onChange(value);
                              setValue("slug", generateSlug(value), {
                                shouldValidate: true,
                              });
                            }
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
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="slug-tu-dong-tao"
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
                    <FormLabel>URL ảnh *</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {field.value && (
                          <div className="flex items-center justify-center border rounded-md p-4">
                            <Image
                              src={field.value}
                              alt="Ảnh chủ đề"
                              width={200}
                              height={200}
                              className="max-w-[200px] max-h-[200px] object-contain"
                            />
                          </div>
                        )}
                        {!isReadonly && (
                          <FileUpload
                            onUploadSuccess={(url) => {
                              field.onChange(url);
                            }}
                            onUploadError={() => {}}
                            accept="image/*"
                            maxSize={1024 * 1024}
                            multiple={false}
                            disabled={isReadonly}
                          />
                        )}
                      </div>
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
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả về chủ đề..."
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
                      <FormLabel>Trạng thái</FormLabel>
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

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="cursor-pointer"
                >
                  {isReadonly ? "Đóng" : "Hủy"}
                </Button>
                {!isReadonly && (
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Cập nhật
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
