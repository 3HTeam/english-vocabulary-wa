import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

export const COLUMN_KEYS = {
  id: "id",
  word: "word",
  translation: "translation",
  phonetic: "phonetic",
  status: "status",
  topic: "topic",
  audio: "audio",
  partOfSpeech: "partOfSpeech",
  synonyms: "synonyms",
  antonyms: "antonyms",
  imageUrl: "imageUrl",
  actions: "actions",
};

export const partOfSpeechVariant: Record<
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
