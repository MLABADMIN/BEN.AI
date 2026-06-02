import { customProvider, gateway } from "ai";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";
import { createDirectOpenAIModel } from "./direct-openai-provider";

export const myProvider = isTestEnvironment
  ? (() => {
      const { chatModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": titleModel,
        },
      });
    })()
  : null;

function hasDirectOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  if (hasDirectOpenAIKey()) {
    return createDirectOpenAIModel();
  }

  return gateway.languageModel(modelId);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }

  if (hasDirectOpenAIKey()) {
    return createDirectOpenAIModel();
  }

  return gateway.languageModel(titleModel.id);
}
