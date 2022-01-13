import { BaseRequest, BaseResponse, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryKey } from "react-query";
export interface ContentTeacherRequest extends BaseRequest {
}
export interface ContentTeacherResponse extends BaseResponse {
    info: {
        draft?: number;
        published?: number;
        pending?: number;
        rejected?: number;
        total: number;
    };
}
export declare function getContentTeacher(client: AxiosInstance, request: ContentTeacherRequest, config?: AxiosRequestConfig): Promise<ContentTeacherResponse>;
export declare const GET_CONTENT_TEACHER_QUERY_KEY: QueryKey;
export declare function useGetContentTeacher(request: ContentTeacherRequest, options?: RequestConfigQueryOptions<ContentTeacherResponse>): import("react-query").UseQueryResult<ContentTeacherResponse, unknown>;
