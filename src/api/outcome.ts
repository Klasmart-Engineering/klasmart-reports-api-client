import { useReportsApiClient } from "../core";
import { BaseRequest, BaseResponse, ReportId, RequestConfigQueryOptions } from "./shared";
import {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface StudentLearningOutcomeRequest extends BaseRequest {

}

export interface StudentLearningOutcomeResponse extends BaseResponse {
    info: {
        acheived: number;
        not_acheived: number;
        not_covered: number;
        skills: {
            skill: string;
            skill_name: string;
            acheived: number;
            not_acheived: number;
            total: number;
        }[]
    };
}

export async function getStudentLearningOutcome(client: AxiosInstance, request: StudentLearningOutcomeRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<StudentLearningOutcomeResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.STUDENT_LEARNING_OUTCOME,
            ...config?.params,
        },
    });
    return resp.data;
}
export const STUDENT_LEARNING_OUTCOME_KEY: QueryKey = `getStudentLearningOutcome`;

export function useStudentLearningOutcome(request: StudentLearningOutcomeRequest, options?: RequestConfigQueryOptions<StudentLearningOutcomeResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([STUDENT_LEARNING_OUTCOME_KEY, request], () => getStudentLearningOutcome(axiosClient, request, options?.config), options?.queryOptions);
}

