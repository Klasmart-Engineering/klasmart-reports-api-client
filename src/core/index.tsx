import {
    getPendingAssignments,
    PendingAssignmentsRequest,
    PendingAssignmentsResponse,
}
    from "../api/assignments";
import {
    ClassAttendanceRateGroupRequest,
    ClassAttendanceRateGroupResponse,
    getClassAttendanceRateGroup,
}
    from "../api/attendance";
import {
    ContentTeacherRequest,
    ContentTeacherResponse,
    getContentTeacher,
}
    from "../api/content";
import {
    ClassTeacherLoadRequest,
    ClassTeacherLoadResponse,
    getClassTeacherLoad,
}
    from "../api/load";
import {
    getStudentLearningOutcome,
    StudentLearningOutcomeRequest,
    StudentLearningOutcomeResponse,
} from "../api/outcome";
import { RequestConfigOptions } from "../api/shared";
import {
    getStudentAttendanceRate,
    StudentAttendanceRateRequest,
    StudentAttendanceRateResponse,
}
    from "../api/studentAttendance";
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

interface ReportsApiActions {
    getClassAttendanceRateGroup: (request: ClassAttendanceRateGroupRequest, options?: RequestConfigOptions) => Promise<ClassAttendanceRateGroupResponse>;
    getPendingAssignments: (request: PendingAssignmentsRequest, options?: RequestConfigOptions) => Promise<PendingAssignmentsResponse>;
    getContentTeacher: (request: ContentTeacherRequest, options?: RequestConfigOptions) => Promise<ContentTeacherResponse>;
    getClassTeacherLoad: (request: ClassTeacherLoadRequest, options?: RequestConfigOptions) => Promise<ClassTeacherLoadResponse>;
    getStudentAttendanceRate: (request: StudentAttendanceRateRequest, options?: RequestConfigOptions) => Promise<StudentAttendanceRateResponse>;
    getStudentLearningOutcome: (request: StudentLearningOutcomeRequest, options?: RequestConfigOptions) => Promise<StudentLearningOutcomeResponse>;
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
    responseInterceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    requestInterceptors?: {
        onFulfilled?: ((value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>) | undefined;
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
        getStudentAttendanceRate: () => { throw new ReportsApiClientNoProviderError(); },
        getStudentLearningOutcome: () => { throw new ReportsApiClientNoProviderError; },
    },
});

export function ReportsApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        responseInterceptors,
        requestInterceptors,
        ...rest
    } = props;

    const queryClient = useMemo(() => new QueryClient(queryOptions), [ queryOptions ]);
    const axiosClient = useMemo(() => {
        const client = axios.create(config);

        for (const interceptor of requestInterceptors ?? []) {
            client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        for (const interceptor of responseInterceptors ?? []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        return client;
    }, [
        config,
        responseInterceptors,
        requestInterceptors,
    ]);

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
    const getStudentAttendanceRateAction = useCallback((request: StudentAttendanceRateRequest, options?: RequestConfigOptions) => {
        return getStudentAttendanceRate(axiosClient, request, options?.config);
    }, [ axiosClient ]);
    const getStudentLearningOutcomeAction = useCallback((request: StudentLearningOutcomeRequest, options?: RequestConfigOptions) => {
        return getStudentLearningOutcome(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const actions = useMemo(() => {
        return {
            getClassAttendanceRateGroup: getClassAttendanceRateGroupAction,
            getPendingAssignments: getPendingAssignmentsAction,
            getContentTeacher: getContentTeacherAction,
            getClassTeacherLoad: getClassTeacherLoadAction,
            getStudentAttendanceRate: getStudentAttendanceRateAction,
            getStudentLearningOutcome: getStudentLearningOutcomeAction,
        };
    }, [
        getClassAttendanceRateGroupAction,
        getPendingAssignmentsAction,
        getContentTeacherAction,
        getClassTeacherLoadAction,
        getStudentAttendanceRateAction,
        getStudentLearningOutcomeAction,
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
