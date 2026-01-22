import type { ColumnDef } from "@tanstack/react-table";
import { Volume2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type TVocabulary } from "@/types/features";
import { type VocabularyFormValues } from "../schemas";
import { COLUMN_KEYS, partOfSpeechVariant } from ".";

interface CreateColumnsOptions {
  t: (key: string, options?: any) => string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
  getId?: (data: VocabularyFormValues) => string;
}



function AudioCell({ audioUrl, label }: { audioUrl: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <audio ref={audioRef} src={audioUrl} preload="none" />
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 cursor-pointer text-xs"
        onClick={handlePlay}
      >
        <Volume2 className="h-3 w-3 mr-1" />
        {label}
      </Button>
    </div>
  );
}

export const createColumns = (
  options: CreateColumnsOptions,
): ColumnDef<VocabularyFormValues>[] => [
  {
    id: COLUMN_KEYS.id,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: COLUMN_KEYS.word,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.word")}
      />
    ),
    meta: {
      name: options.t("field.word"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue(COLUMN_KEYS.word)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.translation,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.translation")}
      />
    ),
    meta: {
      name: options.t("field.translation"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue(COLUMN_KEYS.translation)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.phonetic,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.phonetic")}
      />
    ),
    meta: {
      name: options.t("field.phonetic"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="outline">{row.getValue(COLUMN_KEYS.phonetic)}</Badge>
        </div>
      );
    },
  },
  {
    id: COLUMN_KEYS.topic,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.topic")}
      />
    ),
    meta: {
      name: options.t("field.topic"),
    },
    cell: ({ row }) => {
      const topicName = (row.original as TVocabulary).topic?.name;

      if (!topicName) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <Badge variant="secondary" className="truncate max-w-[120px]">
          {topicName}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: COLUMN_KEYS.status,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.status")}
      />
    ),
    meta: {
      name: options.t("field.status"),
    },
    cell: ({ row }) => {
      const status = row.getValue(COLUMN_KEYS.status) as boolean;

      return (
        <Badge variant={status ? "emerald" : "secondary"}>
          {status
            ? options.t("common.status.active")
            : options.t("common.status.inactive")}
        </Badge>
      );
    },
  },
  {
    id: COLUMN_KEYS.audio,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.audio")}
      />
    ),
    meta: {
      name: options.t("field.audio"),
    },
    cell: ({ row }) => {
      const audioUrlUs = (row.original as TVocabulary).audioUrlUs;
      const audioUrlUk = (row.original as TVocabulary).audioUrlUk;
      const audioUrlAu = (row.original as TVocabulary).audioUrlAu;

      const hasAudio = audioUrlUs || audioUrlUk || audioUrlAu;

      if (!hasAudio) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-col">
          {audioUrlUs && <AudioCell audioUrl={audioUrlUs} label="US" />}
          {audioUrlUk && <AudioCell audioUrl={audioUrlUk} label="UK" />}
          {audioUrlAu && <AudioCell audioUrl={audioUrlAu} label="AU" />}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: COLUMN_KEYS.partOfSpeech,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.part_of_speech")}
      />
    ),
    meta: {
      name: options.t("field.part_of_speech"),
    },
    cell: ({ row }) => {
      const meanings = (row.original as TVocabulary).meanings || [];
      const partsOfSpeech = meanings.map((m) => m.partOfSpeech);
      const uniqueParts = [...new Set(partsOfSpeech)];

      if (uniqueParts.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-wrap items-center gap-1 max-w-[100px]">
          {uniqueParts.map((pos) => (
            <Badge key={pos} variant={partOfSpeechVariant[pos] || "secondary"}>
              {pos}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: COLUMN_KEYS.synonyms,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.synonyms")}
      />
    ),
    meta: {
      name: options.t("field.synonyms"),
    },
    cell: ({ row }) => {
      const meanings = (row.original as TVocabulary).meanings || [];
      const allSynonyms = meanings.flatMap((m) => m.synonyms || []);
      const uniqueSynonyms = [...new Set(allSynonyms)];

      if (uniqueSynonyms.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <span className="block max-w-[120px] truncate text-sm text-muted-foreground">
          [{uniqueSynonyms.join(", ")}]
        </span>
      );
    },
    enableSorting: false,
  },
  {
    id: COLUMN_KEYS.antonyms,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.antonyms")}
      />
    ),
    meta: {
      name: options.t("field.antonyms"),
    },
    cell: ({ row }) => {
      const meanings = (row.original as TVocabulary).meanings || [];
      const allAntonyms = meanings.flatMap((m) => m.antonyms || []);
      const uniqueAntonyms = [...new Set(allAntonyms)];

      if (uniqueAntonyms.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <span className="block max-w-[120px] truncate text-sm text-muted-foreground">
          [{uniqueAntonyms.join(", ")}]
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: COLUMN_KEYS.imageUrl,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.image")}
      />
    ),
    meta: {
      name: options.t("field.image"),
    },
    cell: ({ row }) => {
      const imageUrl = row.getValue(COLUMN_KEYS.imageUrl) as string;
      if (!imageUrl) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <div className="flex items-center">
          <Image
            src={imageUrl}
            alt="Image"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-contain rounded"
          />
        </div>
      );
    },
  },
  {
    id: COLUMN_KEYS.actions,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={options?.onView}
        onEdit={options?.onEdit}
        onDelete={options?.onDelete}
        onRestore={options?.onRestore}
        onForceDelete={options?.onForceDelete}
        getId={options?.getId}
      />
    ),
  },
];
