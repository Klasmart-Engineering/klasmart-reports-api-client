import { BaseRequest, BaseResponse, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryKey } from "react-query";
export interface ClassAttendanceRateGroupRequest extends BaseRequest {
}
export interface ClassAttendanceRateGroupResponse extends BaseResponse {
    info: {
        grp1?: number;
        grp2?: number;
        grp3?: number;
        grp1count?: number;
    };
}
export declare function getClassAttendanceRateGroup(client: AxiosInstance, request: ClassAttendanceRateGroupRequest, config?: AxiosRequestConfig): Promise<ClassAttendanceRateGroupResponse>;
export declare const GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY: QueryKey;
export declare function useGetClassAttendanceRateGroup(request: ClassAttendanceRateGroupRequest, options?: RequestConfigQueryOptions<ClassAttendanceRateGroupResponse>): import("react-query").UseQueryResult<ClassAttendanceRateGroupResponse, unknown>;
