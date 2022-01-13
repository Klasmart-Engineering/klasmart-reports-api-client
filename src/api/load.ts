import { useReportsApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
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

export interface ClassTeacherLoadRequest extends BaseRequest {}

export interface ClassTeacherLoadResponse extends BaseResponse {
    info: {
        class_id: string;
        school_id: string;
        studnum: number;
    }[];
}

export async function getClassTeacherLoad (client: AxiosInstance, request: ClassTeacherLoadRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<ClassTeacherLoadResponse>(`/`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_CLASS_TEACHER_LOAD_QUERY_KEY: QueryKey = `getClassTeacherLoad`;

export function useClassTeacherLoad (request: ClassTeacherLoadRequest, options?: RequestConfigQueryOptions<ClassTeacherLoadResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_CLASS_TEACHER_LOAD_QUERY_KEY, request ], () => getClassTeacherLoad(axiosClient, request, options?.config), options?.queryOptions);
}
