import { BaseRequest, BaseResponse, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryKey } from "react-query";
export interface PendingAssignmentsRequest extends BaseRequest {
}
export interface PendingAssignmentsResponse extends BaseResponse {
    info: {
        class_type: string;
        count: number;
    }[];
}
export declare function getPendingAssignments(client: AxiosInstance, request: PendingAssignmentsRequest, config?: AxiosRequestConfig): Promise<PendingAssignmentsResponse>;
export declare const GET_PENDING_ASSIGNMENTS_QUERY_KEY: QueryKey;
export declare function useGetPendingAssignments(request: PendingAssignmentsRequest, options?: RequestConfigQueryOptions<PendingAssignmentsResponse>): import("react-query").UseQueryResult<PendingAssignmentsResponse, unknown>;
