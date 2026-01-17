import {
  refreshTokenServices,
  signInServices,
  signOutServices,
  signUpServices,
  verifyEmailServices,
  profileServices,
} from "./auth.service";
import {
  createTopicServices,
  deleteTopicServices,
  forceDeleteTopicServices,
  getTopicByIdServices,
  getTopicServices,
  restoreTopicServices,
  updateTopicServices,
} from "./topic.service";
import { uploadServices } from "./upload.service";
import {
  createVocabularyServices,
  getVocabularyServices,
  getVocabularyByIdServices,
  updateVocabularyServices,
  deleteVocabularyServices,
  restoreVocabularyServices,
  forceDeleteVocabularyServices,
} from "./vocabulary.service";

export const apiServices = {
  auth: {
    signIn: signInServices,
    signUp: signUpServices,
    signOut: signOutServices,
    refreshToken: refreshTokenServices,
    verifyEmail: verifyEmailServices,
    profile: profileServices,
  },
  topic: {
    getTopic: getTopicServices,
    getTopicById: getTopicByIdServices,
    createTopic: createTopicServices,
    updateTopic: updateTopicServices,
    deleteTopic: deleteTopicServices,
    restoreTopic: restoreTopicServices,
    forceDeleteTopic: forceDeleteTopicServices,
  },
  upload: {
    postUpload: uploadServices,
  },
  vocabulary: {
    getVocabulary: getVocabularyServices,
    getVocabularyById: getVocabularyByIdServices,
    createVocabulary: createVocabularyServices,
    updateVocabulary: updateVocabularyServices,
    deleteVocabulary: deleteVocabularyServices,
    restoreVocabulary: restoreVocabularyServices,
    forceDeleteVocabulary: forceDeleteVocabularyServices,
  },
};
