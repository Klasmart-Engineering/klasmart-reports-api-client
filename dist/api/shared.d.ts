import { AxiosRequestConfig } from "axios";
import { UseMutationOptions, UseQueryOptions } from "react-query";
export interface RequestConfigOptions {
    config?: AxiosRequestConfig;
}
export interface RequestConfigQueryOptions<TData> extends RequestConfigOptions {
    queryOptions?: Omit<UseQueryOptions<TData, unknown, TData>, 'queryKey' | 'queryFn'>;
}
export interface RequestConfigMutationOptions<TData, TVariables> extends RequestConfigOptions {
    mutationOptions?: Omit<UseMutationOptions<TData, unknown, TVariables>, 'queryKey' | 'queryFn'>;
}
export declare enum ReportId {
    CLASSSATTENDANCERATEGRP = "clsattendrategrp",
    CLASSTEACHER = "clsteacher",
    CONTENTTEACHER = "contentteacher",
    PENDINGASSIGNMENT = "pendingassignment"
}
export interface BaseRequest {
    org: string;
}
export interface BaseResponse {
    errmsg?: string;
    lastupdate?: number;
    expiry?: number;
    successful: boolean;
}
