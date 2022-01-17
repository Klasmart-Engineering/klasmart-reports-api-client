import { useReportsApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
    ReportId,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance
    , AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface ClassAttendanceRateGroupRequest extends BaseRequest {}

export interface ClassAttendanceRateGroupResponse extends BaseResponse {
    info: {
        grp1?: number; // students with attendance rate <75%
        grp2?: number; // students with attendance rate (75%, 95%)
        grp3?: number; // students with attendance rate > 95%
        grp1count?: number; // count of grp1;
    };
}

export async function getClassAttendanceRateGroup (client: AxiosInstance, request: ClassAttendanceRateGroupRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<ClassAttendanceRateGroupResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.CLASSSATTENDANCERATEGRP,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY: QueryKey = `getClassAttendanceRateGroup`;

export function useGetClassAttendanceRateGroup (request: ClassAttendanceRateGroupRequest, options?: RequestConfigQueryOptions<ClassAttendanceRateGroupResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY, request ], () => getClassAttendanceRateGroup(axiosClient, request, options?.config), options?.queryOptions);
}
