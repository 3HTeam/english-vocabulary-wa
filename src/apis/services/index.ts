import * as authServices from "./auth.service";
import * as levelServices from "./level.service";
import * as topicServices from "./topic.service";
import * as uploadServices from "./upload.service";
import * as vocabularyServices from "./vocabulary.service";

export const apiServices = {
  auth: authServices,
  topic: topicServices,
  upload: uploadServices,
  vocabulary: vocabularyServices,
  level: levelServices,
};
