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
exports.useGetPendingAssignments = exports.GET_PENDING_ASSIGNMENTS_QUERY_KEY = exports.getPendingAssignments = void 0;
const core_1 = require("../core");
const shared_1 = require("./shared");
const react_query_1 = require("react-query");
function getPendingAssignments(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.get(`/`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign(Object.assign({}, request), { repid: shared_1.ReportId.PENDINGASSIGNMENT }), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getPendingAssignments = getPendingAssignments;
exports.GET_PENDING_ASSIGNMENTS_QUERY_KEY = `getPendingAssignments`;
function useGetPendingAssignments(request, options) {
    const { axiosClient } = (0, core_1.useReportsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_PENDING_ASSIGNMENTS_QUERY_KEY, request], () => getPendingAssignments(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetPendingAssignments = useGetPendingAssignments;
