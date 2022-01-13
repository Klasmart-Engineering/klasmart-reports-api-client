import { RequestConfigOptions } from "../api/shared";
import axios,
{
    AxiosDefaults,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import React,
{
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryClientProviderProps,
} from "react-query";
import { ClassAttendanceRateGroupRequest, ClassAttendanceRateGroupResponse, getClassAttendanceRateGroup } from "../api/attendance";
import { getPendingAssignments, PendingAssignmentsRequest, PendingAssignmentsResponse } from "../api/assignments";
import { ContentTeacherRequest, ContentTeacherResponse, getContentTeacher } from "../api/content";
import { ClassTeacherLoadRequest, ClassTeacherLoadResponse, getClassTeacherLoad } from "../api/load";

interface ReportsApiActions {
    getClassAttendanceRateGroup: (request: ClassAttendanceRateGroupRequest, options?: RequestConfigOptions) => Promise<ClassAttendanceRateGroupResponse>;
    getPendingAssignments: (request: PendingAssignmentsRequest, options?: RequestConfigOptions) => Promise<PendingAssignmentsResponse>;
    getContentTeacher: (request: ContentTeacherRequest, options?: RequestConfigOptions) => Promise<ContentTeacherResponse>;
    getClassTeacherLoad: (request: ClassTeacherLoadRequest, options?: RequestConfigOptions) => Promise<ClassTeacherLoadResponse>;
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

class ReportsApiClientNoProviderError extends Error {
    constructor () {
        super(`useReportsApiClient must be used within a ReportsApiClientContext.Provider`);
        this.name = `NO_PROVIDER`;
    }
}

const ReportsApiClientContext = createContext<ReportsApiClient>({
    queryClient: (null as unknown) as QueryClient,
    axiosClient: (null as unknown) as AxiosInstance,
    updateHttpConfig: () => { throw new ReportsApiClientNoProviderError(); },
    actions: {
        getClassAttendanceRateGroup: () => { throw new ReportsApiClientNoProviderError(); },
        getPendingAssignments: () => { throw new ReportsApiClientNoProviderError(); },
        getContentTeacher: () => { throw new ReportsApiClientNoProviderError(); },
        getClassTeacherLoad: () => { throw new ReportsApiClientNoProviderError(); },
    },
});

export function ReportsApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        interceptors,
        ...rest
    } = props;

    const queryClient = useMemo(() => new QueryClient(queryOptions), [ queryOptions ]);
    const axiosClient = useMemo(() => {
        const client = axios.create(config);

        for (const interceptor of interceptors ?? []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        return client;
    }, [ config, interceptors ]);

    const updateHttpConfig = useCallback((config: Partial<AxiosDefaults>) => {
        queryClient.cancelMutations();
        queryClient.cancelQueries();
        axiosClient.defaults = {
            ...axiosClient.defaults,
            ...config,
        };
        queryClient.clear();
    }, [ axiosClient, queryClient ]);

    const updatedProps = {
        client: queryClient,
        ...rest,
    };

    const getClassAttendanceRateGroupAction = useCallback((request: ClassAttendanceRateGroupRequest, options?: RequestConfigOptions) => {
        return getClassAttendanceRateGroup(axiosClient, request, options?.config);
    }, [ axiosClient ]);
    const getPendingAssignmentsAction = useCallback((request: PendingAssignmentsRequest, options?: RequestConfigOptions) => {
        return getPendingAssignments(axiosClient, request, options?.config);
    }, [ axiosClient ]);
    const getContentTeacherAction = useCallback((request: ContentTeacherRequest, options?: RequestConfigOptions) => {
        return getContentTeacher(axiosClient, request, options?.config);
    }, [ axiosClient ]);
    const getClassTeacherLoadAction = useCallback((request: ClassTeacherLoadRequest, options?: RequestConfigOptions) => {
        return getClassTeacherLoad(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const actions = useMemo(() => {
        return {
            getClassAttendanceRateGroup: getClassAttendanceRateGroupAction,
            getPendingAssignments: getPendingAssignmentsAction,
            getContentTeacher: getContentTeacherAction,
            getClassTeacherLoad: getClassTeacherLoadAction
        };
    }, [
        getClassAttendanceRateGroupAction,
        getPendingAssignmentsAction,
        getContentTeacherAction,
        getClassTeacherLoadAction
    ]);

    return (
        <ReportsApiClientContext.Provider 
            value={{
                queryClient,
                axiosClient,
                updateHttpConfig,
                actions,
            }}
        >
            <QueryClientProvider {...updatedProps}>
                {children}
            </QueryClientProvider>
        </ReportsApiClientContext.Provider>
    );
}

export const useReportsApiClient = () => {
    const context = useContext(ReportsApiClientContext);
    if (!context) {
        throw new ReportsApiClientNoProviderError();
    }
    return context;
};