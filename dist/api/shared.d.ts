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
export declare type ReportId = `clsattendrategrp` | `clsteacher` | `contentteacher` | `pendingassignment` | `upcomingschedule`;
export interface BaseRequest {
    org: string;
    repid: ReportId;
}
export interface BaseResponse {
    errmsg?: string;
    lastupdate?: number;
    expiry?: number;
    successful: boolean;
}
