"use client";

import { useRef } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { VariantProps } from "class-variance-authority";
import { Volume2 } from "lucide-react";
import Image from "next/image";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { VocabularyFormValues } from "../schemas/vocabulary.schema";
import { TVocabulary } from "@/types/features/vocabulary";

interface CreateColumnsOptions {
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
  getId?: (data: VocabularyFormValues) => string;
  topicMap?: Record<string, string>;
}

const partOfSpeechVariant: Record<
  string,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  noun: "blue",
  verb: "emerald",
  adjective: "purple",
  adverb: "pink",
  pronoun: "cyan",
  preposition: "indigo",
  conjunction: "amber",
  interjection: "rose",
  determiner: "teal",
  article: "slate",
  numeral: "lime",
  phrasal_verb: "fuchsia",
  idiom: "violet",
  phrase: "yellow",
};

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
  options?: CreateColumnsOptions
): ColumnDef<VocabularyFormValues>[] => [
  {
    id: "select",
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
    accessorKey: "word",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Từ vựng" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("word")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "translation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nghĩa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("translation")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phonetic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phiên âm" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="outline">{row.getValue("phonetic")}</Badge>
        </div>
      );
    },
  },
  {
    id: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chủ đề" />
    ),
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;

      return (
        <Badge variant={status ? "emerald" : "secondary"}>
          {status ? "Hiển thị" : "Tạm ẩn"}
        </Badge>
      );
    },
  },
  {
    id: "audio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Âm thanh" />
    ),
    cell: ({ row }) => {
      const audioUrlUs = row.original.audioUrlUs;
      const audioUrlUk = row.original.audioUrlUk;
      const audioUrlAu = row.original.audioUrlAu;

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
    id: "partOfSpeech",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Từ loại" />
    ),
    cell: ({ row }) => {
      const meanings = row.original.meanings || [];
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
    id: "synonyms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Từ đồng nghĩa" />
    ),
    cell: ({ row }) => {
      const meanings = row.original.meanings || [];
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
    id: "antonyms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Từ trái nghĩa" />
    ),
    cell: ({ row }) => {
      const meanings = row.original.meanings || [];
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
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string;
      if (!imageUrl) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <div className="flex items-center">
          <Image
            src={imageUrl}
            alt="Ảnh từ vựng"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-contain rounded"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
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

export const columns = createColumns();
