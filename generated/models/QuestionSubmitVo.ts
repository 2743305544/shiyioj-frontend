/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from "./JudgeInfo";
import type { UserVO } from "./UserVO";
export type QuestionSubmitVo = {
  code?: string;
  createTime?: string;
  id?: number;
  judgeInfo?: JudgeInfo;
  language?: string;
  questionId?: number;
  status?: number;
  updateTime?: string;
  user?: UserVO;
  userId?: number;
};
