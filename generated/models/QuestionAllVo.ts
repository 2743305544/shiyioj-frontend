/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from "./JudgeCase";
import type { JudgeConfig } from "./JudgeConfig";
export type QuestionAllVo = {
  acceptNum?: number;
  answer?: string;
  content?: string;
  createTime?: string;
  favourNum?: number;
  id?: number;
  judgeCase?: Array<JudgeCase>;
  judgeConfig?: JudgeConfig;
  submitNum?: number;
  tags?: Array<string>;
  thumbNum?: number;
  title?: string;
  updateTime?: string;
  userId?: number;
};
