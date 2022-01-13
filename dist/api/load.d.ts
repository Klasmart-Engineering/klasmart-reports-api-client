import { BaseRequest, BaseResponse, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryKey } from "react-query";
export interface ClassTeacherLoadRequest extends BaseRequest {
}
export interface ClassTeacherLoadResponse extends BaseResponse {
    info: {
        class_id: string;
        school_id: string;
        studnum: number;
    }[];
}
export declare function getClassTeacherLoad(client: AxiosInstance, request: ClassTeacherLoadRequest, config?: AxiosRequestConfig): Promise<ClassTeacherLoadResponse>;
export declare const GET_CLASS_TEACHER_LOAD_QUERY_KEY: QueryKey;
export declare function useClassTeacherLoad(request: ClassTeacherLoadRequest, options?: RequestConfigQueryOptions<ClassTeacherLoadResponse>): import("react-query").UseQueryResult<ClassTeacherLoadResponse, unknown>;
