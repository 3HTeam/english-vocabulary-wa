"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import {
  topicSchema,
  type TopicFormValues,
  topicDefaultValues,
} from "../schemas/topic.schema";
import { useCreateTopicMutation } from "@/apis/queries/hooks/topic.queries";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api/base";
import { AxiosError } from "axios";
import { TCreateTopicResponse } from "@/types/features/topic";

interface AddTopicModalProps {
  titleAdd?: string;
  trigger?: React.ReactNode;
}

export function AddTopicModal({
  titleAdd = "Thêm chủ đề",
  trigger,
}: AddTopicModalProps) {
  const { mutate: createTopic } = useCreateTopicMutation();
  const [open, setOpen] = useState(false);

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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    createTopic(
      {
        name: values.name,
        imageUrl: values.imageUrl,
        slug: values.slug,
        description: values.description || "",
        status: values.status,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Tạo chủ đề thành công!");
          reset(topicDefaultValues);
          setOpen(false);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreateTopicResponse>
          >;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || "Tạo chủ đề thất bại, vui lòng thử lại.";
          toast.error(message || fallbackMessage);
        },
      }
    );
  };

  const handleCancel = () => {
    reset(topicDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">{titleAdd}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{titleAdd}</DialogTitle>
          <DialogDescription>
            Tạo một chủ đề từ vựng mới. Điền thông tin bên dưới.
          </DialogDescription>
        </DialogHeader>

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
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          setValue("slug", generateSlug(value), {
                            shouldValidate: true,
                          });
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
                      <Input placeholder="slug-tu-dong-tao" {...field} />
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
                    <FileUpload
                      onUploadSuccess={(url) => {
                        field.onChange(url);
                      }}
                      onUploadError={() => {}}
                      accept="image/*"
                      maxSize={1024 * 1024}
                      multiple={false}
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả về chủ đề..."
                      rows={3}
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                Hủy
              </Button>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                <Plus className="w-4 h-4" />
                Tạo chủ đề
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
