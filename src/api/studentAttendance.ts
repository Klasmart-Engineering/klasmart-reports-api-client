import { useReportsApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
    ReportId,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface StudentAttendanceRateRequest extends BaseRequest { }

interface Attendance {
    class_date: string;
    rate: number;
}

export interface StudentAttendanceRateResponse extends BaseResponse {
    info: Attendance[];
}

export async function getStudentAttendanceRate (client: AxiosInstance, request: StudentAttendanceRateRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<StudentAttendanceRateResponse>(`/`, {
        ...config,
        params: {
            ...request,
            repid: ReportId.STUDENT_ATTENDANCE,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_STUDENT_ATTENDANCE_RATE_QUERY_KEY: QueryKey = `getStudentAttendanceRate`;

export function useGetStudentAttendanceRate (request: StudentAttendanceRateRequest, options?: RequestConfigQueryOptions<StudentAttendanceRateResponse>) {
    const { axiosClient } = useReportsApiClient();
    return useQuery([ GET_STUDENT_ATTENDANCE_RATE_QUERY_KEY, request ], () => getStudentAttendanceRate(axiosClient, request, options?.config), options?.queryOptions);
}
