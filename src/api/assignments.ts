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

export interface PendingAssignmentsRequest extends BaseRequest {}

export interface PendingAssignmentsResponse extends BaseResponse {
    info: {
        class_type: string;
        count: number;
    }[];
}

export async function getPendingAssignments (client: AxiosInstance, request: PendingAssignmentsRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<PendingAssignmentsResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.PENDING_ASSIGNMENT,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_PENDING_ASSIGNMENTS_QUERY_KEY: QueryKey = `getPendingAssignments`;

export function useGetPendingAssignments (request: PendingAssignmentsRequest, options?: RequestConfigQueryOptions<PendingAssignmentsResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_PENDING_ASSIGNMENTS_QUERY_KEY, request ], () => getPendingAssignments(axiosClient, request, options?.config), options?.queryOptions);
}
