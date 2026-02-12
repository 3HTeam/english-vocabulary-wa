import * as authServices from "./auth/auth.service";
import * as bannerServices from "./banner/banner.service";
import * as grammarCategoryServices from "./grammar-category/grammar-category.service";
import * as grammarExerciseServices from "./grammar-exercise/grammar-exercise.service";
import * as grammarTopicServices from "./grammar-topic/grammar-topic.service";
import * as levelServices from "./level/level.service";
import * as moduleServices from "./module/module.service";
import * as onboardingServices from "./onboarding/onboarding.service";
import * as popupServices from "./popup/popup.service";
import * as settingServices from "./setting/setting.service";
import * as topicServices from "./topic/topic.service";
import * as uploadServices from "./upload/upload.service";
import * as userServices from "./user/user.service";
import * as vocabularyServices from "./vocabulary/vocabulary.service";

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
  banner: bannerServices,
};
