"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetClassAttendanceRateGroup = exports.GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY = exports.getClassAttendanceRateGroup = void 0;
const core_1 = require("../core");
const shared_1 = require("./shared");
const react_query_1 = require("react-query");
function getClassAttendanceRateGroup(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.get(`/`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign(Object.assign({}, request), { repid: shared_1.ReportId.CLASSSATTENDANCERATEGRP }), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getClassAttendanceRateGroup = getClassAttendanceRateGroup;
exports.GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY = `getClassAttendanceRateGroup`;
function useGetClassAttendanceRateGroup(request, options) {
    const { axiosClient } = (0, core_1.useReportsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_CLASS_ATTENDANCE_RATE_GROUP_QUERY_KEY, request], () => getClassAttendanceRateGroup(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetClassAttendanceRateGroup = useGetClassAttendanceRateGroup;
