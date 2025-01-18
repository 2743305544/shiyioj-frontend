/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { QuestionAllVo } from "./QuestionAllVo";
export type Page_QuestionAllVo_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<QuestionAllVo>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
