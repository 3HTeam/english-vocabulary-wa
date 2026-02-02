import z from "zod";

export const getModuleSchema = (t: (t: string) => string) =>
  z.object({
    name: z.string().min(1, t("field.module_name_required")),
    description: z.string().nullish(),
    status: z.boolean(),
  });

export type ModuleFormValues = z.infer<ReturnType<typeof getModuleSchema>>;
