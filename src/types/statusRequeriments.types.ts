import React from "react";

interface IGeneralStatusRequirementRequest {
  month: number;
  year: number;
  publicCode: string;
  plannedExecution: string;
}

interface IGeneralStatusRequirementResponse {
  generalStatus: string;
}

interface IProcessRequirementRequest {
  cutOffDate: string;
  executionDate: string;
  month: number;
  plannedExecution: string;
  publicCode: string;
  typeExecution: string;
  year: number;
}

interface IProcessRequirementResponse {
  descriptionUse: string,
  descriptionUseForCustomers: string,
  evaluationDescription: string,
  evaluationStatus: string | React.ReactNode,
  publicCode: string,
  requirementId: string,
  requirementType: IRequirementType,
  evaluationStatusText?: string,
}

declare type IRequirementType = "HUMAN_VALIDATION" | "SYSTEM_VALIDATION" | "DOCUMENT";

export type {
  IGeneralStatusRequirementRequest,
  IGeneralStatusRequirementResponse,
  IProcessRequirementRequest,
  IProcessRequirementResponse,
  IRequirementType,
};
