import { RequestConfigOptions } from "../api/shared";
import { AxiosDefaults, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { DefaultOptions, MutationCache, QueryCache, QueryClient, QueryClientProviderProps } from "react-query";
import { ClassAttendanceRateGroupRequest, ClassAttendanceRateGroupResponse } from "../api";
interface ReportsApiActions {
    getClassAttendanceRateGroup: (request: ClassAttendanceRateGroupRequest, options?: RequestConfigOptions) => Promise<ClassAttendanceRateGroupResponse>;
}
interface ReportsApiClient {
    queryClient: QueryClient;
    axiosClient: AxiosInstance;
    updateHttpConfig: (config: Partial<AxiosDefaults>) => void;
    actions: ReportsApiActions;
}
interface ProviderProps extends Partial<QueryClientProviderProps> {
    children: React.ReactNode;
    config: AxiosRequestConfig;
    interceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    queryOptions?: {
        queryCache?: QueryCache;
        mutationCache?: MutationCache;
        defaultOptions?: DefaultOptions;
    };
}
export declare function ReportsApiClientProvider(props: ProviderProps): JSX.Element;
export declare const useReportsApiClient: () => ReportsApiClient;
export {};
