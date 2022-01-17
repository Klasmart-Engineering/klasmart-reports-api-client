import { useReportsApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
    ReportId,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance
    ,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface ContentTeacherRequest extends BaseRequest {}

export interface ContentTeacherResponse extends BaseResponse {
    info: {
        draft?: number;
        published?: number;
        pending?: number;
        rejected?: number;
        total: number;
    };
}

export async function getContentTeacher (client: AxiosInstance, request: ContentTeacherRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<ContentTeacherResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.CONTENTTEACHER,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_CONTENT_TEACHER_QUERY_KEY: QueryKey = `getContentTeacher`;

export function useGetContentTeacher (request: ContentTeacherRequest, options?: RequestConfigQueryOptions<ContentTeacherResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_CONTENT_TEACHER_QUERY_KEY, request ], () => getContentTeacher(axiosClient, request, options?.config), options?.queryOptions);
}
