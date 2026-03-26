import { Observable, Subscription } from 'rxjs';

declare enum wsConnectionStatusEvent {
    Connected = "Connected",
    DisConnected = "DisConnected",
    Error = "Error",
    NotSet = "NotSet",
    sendingDataWhileDisconnected = "sendingDataWhileDisconnected",
    Reconnecting = "Reconnecting"
}
declare class wsStatusMsg {
    type: wsConnectionStatusEvent;
    data: any;
}
declare enum wsMsgType {
    DashboardStatus = "DashboardStatus",
    ServiceData = "ServiceData",
    ServiceCommand = "ServiceCommand",
    NotSet = "NotSet"
}
declare class wsMessageBase {
    action: string;
    msgTime: number;
    id: `${string}-${string}-${string}-${string}-${string}`;
    msgType: wsMsgType;
    data: any;
    servType: serviceType;
}
declare class wsServiceSendDataMsg extends wsMessageBase {
    GuID: string;
    sessionID: string;
    secrete: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    constructor();
}
declare enum serviceType {
    system = "system",
    external = "external",
    dash = "dash",
    mobile = "mobile"
}
declare class paramsBase {
    key: string;
    value: string;
    dataType: DataType;
    range: string;
}
interface Sender {
    GuID: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    servType: serviceType;
}
declare class wsServiceReceiveDataMsg implements Sender {
    GuID: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    servType: serviceType;
    id: `${string}-${string}-${string}-${string}-${string}`;
    msgTime: number;
    data: any;
    dataType: paramsBase[];
}
declare class serviceTokenDef {
    sessionID: string;
    secrete: string;
    wsAddr: string;
    isPro: boolean;
    rateLimit: number;
    isDash: boolean;
    startTime: string;
    desc: string;
    name: string;
}
declare enum DataType {
    String = "string",
    Int = "int",
    Float = "float",
    Bool = "bool",
    Array = "array",
    Json = "json",
    Any = "any",
    NotSet = "NotSet"
}
declare enum DataType {
    int = "int",
    string = "string",
    intArr = "intArr",
    stringArr = "stringArr",
    object = "object",
    notSet = "notSet"
}
declare enum deviceConnectionStatus {
    Active = "Active",
    Inactive = "Inactive",
    NotSet = "NotSet"
}

declare class wsHandlerImpl {
    private wsDataMsgSubject;
    private connectionStatSubject;
    private wsHandl;
    private serverUrl;
    private reconnectInterval;
    private shouldReconnect;
    private reconnectTimeout;
    constructor();
    getConnectionStatus(): boolean;
    getWsStatusSubject(): Observable<wsStatusMsg>;
    getWsDataSubject(): Observable<any>;
    private onWsMessage;
    private wsOnConnect;
    private wsOnError;
    private wsOnClose;
    disconnect(): void;
    connect(wsConnectAddr: string): void;
    sendMessage(msg: any): void;
}

declare class nikkiServiceBaseImpl {
    protected servDef: any | undefined;
    protected token: serviceTokenDef | undefined;
    protected connectAddr: string | undefined;
    protected ws: wsHandlerImpl;
    protected lastMsgTime: number;
    protected wsDataSubscription: Subscription | undefined;
    protected wsStatusSubscription: Subscription | undefined;
    private readonly LOG_PREFIX;
    wsConnectionStatus: deviceConnectionStatus;
    protected recentData: wsServiceReceiveDataMsg | undefined;
    constructor();
    onstatusChanged(status: wsStatusMsg): void;
    protected onWsDataMsg(data: wsServiceReceiveDataMsg): void;
    getRecentMsg(): wsServiceReceiveDataMsg | undefined;
    getConnectAddress(srvDef: any, token: serviceTokenDef): string | undefined;
    loadFromUrl(): boolean;
    loadDefinitionsFromServer(): Promise<null | undefined>;
    setServiceDef(serviceDef: any): Promise<null | undefined>;
    setTokenDef(serviceToken: any): Promise<null | undefined>;
    loadServiceDefFile(event: any): void;
    loadServiceTokenFile(event: any): void;
    start(): Promise<void>;
    startWithDef(srv: any, token: serviceTokenDef): Promise<boolean>;
    stop(): void;
    getNodedata(data?: any): wsServiceSendDataMsg | undefined;
    sendData(message: any): boolean;
    isConnected(): boolean;
    onConnect(): void;
    onDisconnect(): void;
    onError(error: unknown): void;
    onData(data: wsServiceReceiveDataMsg): void;
}

declare class nikkiServiceBase extends nikkiServiceBaseImpl {
}

export { nikkiServiceBase };
