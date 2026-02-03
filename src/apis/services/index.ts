import * as authServices from "./auth.service";
import * as grammarCategoryServices from "./grammar-category.service";
import * as grammarExerciseServices from "./grammar-exercise.service";
import * as grammarTopicServices from "./grammar-topic.service";
import * as levelServices from "./level.service";
import * as moduleServices from "./module.service";
import * as onboardingServices from "./onboarding.service";
import * as popupServices from "./popup.service";
import * as settingServices from "./setting.service";
import * as topicServices from "./topic.service";
import * as uploadServices from "./upload.service";
import * as userServices from "./user.service";
import * as vocabularyServices from "./vocabulary.service";

export const apiServices = {
  auth: authServices,
  topic: topicServices,
  upload: uploadServices,
  vocabulary: vocabularyServices,
  level: levelServices,
  user: userServices,
  setting: settingServices,
  grammarCategory: grammarCategoryServices,
  grammarTopic: grammarTopicServices,
  grammarExercise: grammarExerciseServices,
  module: moduleServices,
  onboarding: onboardingServices,
  popup: popupServices,
};

export * from "./auth.service";
export * from "./grammar-category.service";
export * from "./grammar-topic.service";
export * from "./grammar-exercise.service";
export * from "./level.service";
export * from "./setting.service";
export * from "./topic.service";
export * from "./upload.service";
export * from "./user.service";
export * from "./vocabulary.service";
