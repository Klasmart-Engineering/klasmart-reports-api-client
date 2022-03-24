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
        learning_outcomes: {
            achieved: number;
            not_achieved: number;
            not_covered: number;
        }
        skills: {
            skill: string;
            skill_name: string;
            achieved: number;
            not_achieved: number;
            total: number;
        }[]
    };
}

export interface StudentLearningOutcomeBackEndResponse extends BaseResponse {
    info: {
        learning_outcomes: string;
        skills: string;
    }
}

export async function getStudentLearningOutcome(client: AxiosInstance, request: StudentLearningOutcomeRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<StudentLearningOutcomeBackEndResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.STUDENT_LEARNING_OUTCOME,
            ...config?.params,
        },
    });
    const learningOutComeData = <StudentLearningOutcomeResponse>{ ...resp.data, 
            info : { 
                ...resp.data.info, 
                learning_outcomes: JSON.parse(resp.data.info.learning_outcomes), 
                skills: JSON.parse(resp.data.info.skills)
            }
    };
    return learningOutComeData;
}
export const STUDENT_LEARNING_OUTCOME_KEY: QueryKey = `getStudentLearningOutcome`;

export function useStudentLearningOutcome(request: StudentLearningOutcomeRequest, options?: RequestConfigQueryOptions<StudentLearningOutcomeResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([STUDENT_LEARNING_OUTCOME_KEY, request], () => getStudentLearningOutcome(axiosClient, request, options?.config), options?.queryOptions);
}

