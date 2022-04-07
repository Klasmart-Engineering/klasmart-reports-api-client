import { useReportsApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
    ReportId,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance
    ,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface AssignmentCompletion {
    total: number;
    completed: number;
    incomplete: number;
    completed_perc: number;
    incomplete_perc: number;
}
export interface StudentAssignmentCompletionRequest extends BaseRequest { }

export interface StudentAssignmentCompletionResponse extends BaseResponse {
    info: AssignmentCompletion;
}

export async function getStudentAssignmentCompletion (client: AxiosInstance, request: StudentAssignmentCompletionRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<StudentAssignmentCompletionResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.STUDENT_ASSIGNMENTCOMPLETION,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_STUDENT_ASSIGNMENTCOMPLETION_QUERY_KEY: QueryKey = `getStudentAssignmentCompletion`;

export function useGetStudentAssignmentCompletion (request: StudentAssignmentCompletionRequest, options?: RequestConfigQueryOptions<StudentAssignmentCompletionResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_STUDENT_ASSIGNMENTCOMPLETION_QUERY_KEY, request ], () => getStudentAssignmentCompletion(axiosClient, request, options?.config), options?.queryOptions);
}
