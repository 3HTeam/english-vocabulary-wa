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
  getTopicByIdServices,
  getTopicServices,
  updateTopicServices,
} from "./topic.service";
import { uploadServices } from "./upload.service";

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
  },
  upload: {
    postUpload: uploadServices,
  },
};
