import * as authServices from "./auth.service";
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
  module: moduleServices,
  onboarding: onboardingServices,
  popup: popupServices,
};
