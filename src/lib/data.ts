import interviewJson from "../../content/interview.json";
import type { InterviewData } from "./types";

export const data = interviewJson as InterviewData;
export const { profile, interviews, education, domainExpertise } = data;
