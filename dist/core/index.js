"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReportsApiClient = exports.ReportsApiClientProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_query_1 = require("react-query");
const api_1 = require("../api");
class ReportsApiClientNoProviderError extends Error {
    constructor() {
        super(`useReportsApiClient must be used within a ReportsApiClientContext.Provider`);
        this.name = `NO_PROVIDER`;
    }
}
const ReportsApiClientContext = (0, react_1.createContext)({
    queryClient: null,
    axiosClient: null,
    updateHttpConfig: () => { throw new ReportsApiClientNoProviderError(); },
    actions: {
        getClassAttendanceRateGroup: () => { throw new ReportsApiClientNoProviderError(); },
    },
});
function ReportsApiClientProvider(props) {
    const { children, config, queryOptions, interceptors } = props, rest = __rest(props, ["children", "config", "queryOptions", "interceptors"]);
    const queryClient = (0, react_1.useMemo)(() => new react_query_1.QueryClient(queryOptions), [queryOptions]);
    const axiosClient = (0, react_1.useMemo)(() => {
        const client = axios_1.default.create(config);
        for (const interceptor of interceptors !== null && interceptors !== void 0 ? interceptors : []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }
        return client;
    }, [config, interceptors]);
    const updateHttpConfig = (0, react_1.useCallback)((config) => {
        queryClient.cancelMutations();
        queryClient.cancelQueries();
        axiosClient.defaults = Object.assign(Object.assign({}, axiosClient.defaults), config);
        queryClient.clear();
    }, [axiosClient, queryClient]);
    const updatedProps = Object.assign({ client: queryClient }, rest);
    const getClassAttendanceRateGroupAction = (0, react_1.useCallback)((request, options) => {
        return (0, api_1.getClassAttendanceRateGroup)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const actions = (0, react_1.useMemo)(() => {
        return {
            getClassAttendanceRateGroup: getClassAttendanceRateGroupAction,
        };
    }, [
        getClassAttendanceRateGroupAction,
    ]);
    return (react_1.default.createElement(ReportsApiClientContext.Provider, { value: {
            queryClient,
            axiosClient,
            updateHttpConfig,
            actions,
        } },
        react_1.default.createElement(react_query_1.QueryClientProvider, Object.assign({}, updatedProps), children)));
}
exports.ReportsApiClientProvider = ReportsApiClientProvider;
const useReportsApiClient = () => {
    const context = (0, react_1.useContext)(ReportsApiClientContext);
    if (!context) {
        throw new ReportsApiClientNoProviderError();
    }
    return context;
};
exports.useReportsApiClient = useReportsApiClient;
