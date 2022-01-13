import { AxiosRequestConfig } from "axios";
import {
    UseMutationOptions,
    UseQueryOptions,
} from "react-query";

export interface RequestConfigOptions {
    config?: AxiosRequestConfig;
}

export interface RequestConfigQueryOptions<TData> extends RequestConfigOptions {
    queryOptions?: Omit<UseQueryOptions<TData, unknown, TData>, 'queryKey' | 'queryFn'>;
}

export interface RequestConfigMutationOptions<TData, TVariables> extends RequestConfigOptions {
    mutationOptions?: Omit<UseMutationOptions<TData, unknown, TVariables>, 'queryKey' | 'queryFn'>;
}

export type ReportId = `clsattendrategrp` | `clsteacher` | `contentteacher` | `pendingassignment` | `upcomingschedule`

export interface BaseRequest {
    org: string;
    repid: ReportId;
}

export interface BaseResponse {
    errmsg?: string; // only present if successful is false
    lastupdate?: number; // this is the epoch timestamp for the last update time of this record. It needs to be converted to local time so that user knows the staleness of the data.
    expiry?: number;
    successful: boolean; // true: proceed to process message (info), false: field errmsg contains detailed error message
}
