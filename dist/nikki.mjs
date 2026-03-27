// src/nikkiDef.ts
var wsStatusMsg = class {
  constructor() {
    this.type = "NotSet" /* NotSet */;
    this.data = {};
  }
};
var wsMessageBase = class {
  constructor() {
    this.action = "sendMessage";
    this.msgTime = Date.now();
    this.id = crypto.randomUUID();
    this.msgType = "NotSet" /* NotSet */;
    this.data = void 0;
    this.servType = "external" /* external */;
  }
};
var wsServiceSendDataMsg = class extends wsMessageBase {
  constructor() {
    super();
    this.GuID = "";
    this.sessionID = "";
    this.secrete = "";
    this.servID = "";
    this.instID = "";
    this.name = "";
    this.dispName = "";
    this.msgType = "ServiceData" /* ServiceData */;
    this.servType = "external" /* external */;
  }
};
var serviceTokenDef = class {
  constructor() {
    this.sessionID = "";
    this.secrete = "";
    this.wsAddr = "";
    this.isPro = false;
    this.rateLimit = 2;
    this.isDash = false;
    this.startTime = "";
    this.desc = "";
    this.name = "";
  }
};
var wsConnectUrlDef = class {
  constructor() {
    this.servDef = void 0;
    this.token = void 0;
  }
};
var wsServiceConnectDef = class extends wsConnectUrlDef {
  constructor() {
    super(...arguments);
    this.wsAddr = void 0;
  }
};
var serviceBasePath = "resc/playground/services";
var queryStringTokenKey = "token";
var queryStringWsAddrKey = "wsAddr";
var queryStringSrvNameKey = "name";
var queryStringKey = "token";
var outDataSizeSegmentMaxLimit = 500;
var reconnectIntervalInMilli = 6e6;

// src/jsWebSocketImpl.ts
import { Subject } from "rxjs";
var wsHandlerImpl = class {
  constructor() {
    this.wsDataMsgSubject = new Subject();
    this.connectionStatSubject = new Subject();
    this.wsHandl = void 0;
    this.serverUrl = "";
    this.reconnectInterval = reconnectIntervalInMilli;
    this.shouldReconnect = true;
    this.reconnectTimeout = void 0;
    this.wsHandl = void 0;
    this.shouldReconnect = true;
    this.reconnectTimeout = null;
  }
  getBufferedAmount() {
    return this.wsHandl ? this.wsHandl.bufferedAmount : 0;
  }
  getConnectionStatus() {
    let status = false;
    try {
      if (this.wsHandl) {
        status = this.wsHandl.readyState === WebSocket.OPEN;
      }
    } catch (e) {
      console.error("Exception while getConnectionStatus:", e.message);
    }
    return status;
  }
  getWsStatusSubject() {
    return this.connectionStatSubject;
  }
  getWsDataSubject() {
    return this.wsDataMsgSubject;
  }
  onWsMessage(msg) {
    try {
      if (msg && msg.data) {
        const jevent = JSON.parse(msg.data);
        this.wsDataMsgSubject.next(jevent);
      }
    } catch (e) {
      console.error("Exception while onWsMessage:", e.message);
    }
  }
  wsOnConnect() {
    try {
      console.info("Playground connected.");
      const wstat = new wsStatusMsg();
      wstat.type = "Connected" /* Connected */;
      this.connectionStatSubject.next(wstat);
    } catch (e) {
      console.error("Exception while wsOnConnect:", e.message);
    }
  }
  wsOnError(err) {
    try {
      console.info("Playground error:", err);
      const wstat = new wsStatusMsg();
      wstat.type = "Error" /* Error */;
      wstat.data = err;
      this.connectionStatSubject.next(wstat);
    } catch (e) {
      console.error("Exception while wsOnError:", e.message);
    }
  }
  wsOnClose() {
    try {
      console.info("Playground closed.");
      const wstat = new wsStatusMsg();
      wstat.type = "DisConnected" /* DisConnected */;
      this.connectionStatSubject.next(wstat);
    } catch (e) {
      console.error("Exception while wsOnClose:", e.message);
    }
  }
  disconnect() {
    try {
      this.shouldReconnect = false;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
        this.wsHandl.close(1e3, "Client initiated close");
      }
    } catch (e) {
      console.error("Exception while disconnect:", e.message);
    }
  }
  connect(wsConnectAddr) {
    try {
      this.serverUrl = wsConnectAddr;
      if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
        return;
      }
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      this.wsHandl = new WebSocket(this.serverUrl);
      this.wsHandl.onopen = () => this.wsOnConnect();
      this.wsHandl.onmessage = (event) => this.onWsMessage(event);
      this.wsHandl.onclose = () => {
        this.wsOnClose();
        if (this.shouldReconnect && this.wsHandl) {
          this.reconnectTimeout = setTimeout(() => {
            console.info("Trying to reconnect.");
            const wstat = new wsStatusMsg();
            wstat.type = "Reconnecting" /* Reconnecting */;
            this.connectionStatSubject.next(wstat);
          }, this.reconnectInterval);
        }
      };
      this.wsHandl.onerror = (error) => this.wsOnError(error);
    } catch (e) {
      console.error("Exception while connect:", e.message);
    }
  }
  sendMessage(msg) {
    try {
      if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
        this.wsHandl.send(JSON.stringify(msg));
      } else {
        console.error("Playground is not connected.");
        const wstat = new wsStatusMsg();
        wstat.type = "sendingDataWhileDisconnected" /* sendingDataWhileDisconnected */;
        wstat.data = void 0;
        this.connectionStatSubject.next(wstat);
      }
    } catch (e) {
      console.error("Exception while sendMessage:", e.message);
    }
  }
};

// src/playServiceUtils.ts
var serviceUtils = class _serviceUtils extends serviceTokenDef {
  static getServiceLaunchUrl(token, serv) {
    let url = void 0;
    try {
      const conntDef = new wsConnectUrlDef();
      conntDef.servDef = serv;
      conntDef.token = token;
      const jsonString = JSON.stringify(conntDef);
      const eName = encodeURIComponent(serv.dispName);
      const eWsAddr = encodeURIComponent(token.wsAddr);
      const encodedData = encodeURIComponent(jsonString);
      url = `${window.location.origin}/${serviceBasePath}/${serv.name}/index.html?${queryStringTokenKey}=${encodedData}&${queryStringWsAddrKey}=${eWsAddr}&${queryStringSrvNameKey}=${eName}`;
      console.info("service connect address", url);
    } catch (e) {
      console.error("Exception while getServiceLaunchUrl:", e.message);
    }
    return url;
  }
  static decodeToken(token) {
    let share = void 0;
    try {
      if (token) {
        const decodeUrl = decodeURIComponent(token);
        share = JSON.parse(decodeUrl.toString());
        console.info("decoded decodeToken:", share);
      } else {
        console.error("Not a valid token URL:", token);
      }
    } catch (e) {
      console.error("Exception while decodeToken:", e.message);
    }
    return share;
  }
  static decodeUrlInformation() {
    let share = void 0;
    try {
      const params = new URLSearchParams(window.location.search);
      const tokenDec = params.get(queryStringTokenKey);
      const encodedWsAddr = params.get(queryStringWsAddrKey);
      if (tokenDec && encodedWsAddr) {
        share = new wsServiceConnectDef();
        const wsAddr = decodeURIComponent(encodedWsAddr);
        const token = encodeURIComponent(tokenDec);
        share.wsAddr = `${wsAddr}?${queryStringKey}=${token}`;
        const dec = _serviceUtils.decodeToken(token);
        if (dec && dec.servDef && dec.token) {
          share.servDef = dec.servDef;
          share.token = dec.token;
        } else {
          share.servDef = void 0;
          share.token = void 0;
        }
      } else {
        share = void 0;
      }
    } catch (e) {
      console.error("Exception while decodeUrlInformation:", e.message);
    }
    console.info("URL information:", share);
    return share;
  }
  static getWsConnectUrl(serv, token) {
    let fullURL = void 0;
    try {
      const def = new wsConnectUrlDef();
      def.token = token;
      def.servDef = serv;
      const strData = JSON.stringify(def);
      const enComp = encodeURIComponent(strData);
      fullURL = `${token.wsAddr}?${queryStringKey}=${enComp}`;
    } catch (e) {
      console.error("Exception while getWsConnectUrl:", e.message);
    }
    return fullURL;
  }
};

// src/nikkiJsServiceBase.ts
var nikkiServiceBaseImpl = class {
  constructor() {
    this.lastMsgTime = 0;
    this.LOG_PREFIX = "[nikki.build]";
    this.wsConnectionStatus = "Inactive" /* Inactive */;
    this.isInitialized = false;
    // ==============================
    // CONFIG (tune as needed)
    // ==============================
    this.MAX_OUTGOING_SIZE_BYTES = 1024 * 1024;
    // 1MB
    this.MAX_BUFFERED_AMOUNT_BYTES = 2 * 1024 * 1024;
    // 2MB
    this.MAX_QUEUE_SIZE = 200;
    this.RATE_WINDOW_MS = 1e3;
    // ==============================
    // INTERNAL STATE
    // ==============================
    this.sendQueue = [];
    this.sentTimestamps = [];
    this.isFlushing = false;
    this.onstatusChanged = (status) => {
      if (status.type == "Connected" /* Connected */) {
        this.onConnect();
      }
      if (status.type == "DisConnected" /* DisConnected */) {
        this.onDisconnect();
      }
      if (status.type == "Error" /* Error */) {
        this.onError(status.data);
      }
    };
    this.ws = new wsHandlerImpl();
  }
  // 🔒 idempotent init
  initSubscriptions() {
    if (this.isInitialized) {
      console.warn("[nikki] initSubscriptions already called. Skipping.");
      return;
    }
    if (this.wsDataSubscription || this.wsStatusSubscription) {
      console.warn("[nikki] Subscriptions already exist. Skipping re-init.");
      this.isInitialized = true;
      return;
    }
    this.wsDataSubscription = this.ws.getWsDataSubject().subscribe({
      next: (data) => this.onWsDataMsg(data),
      error: (err) => this.onError(err)
    });
    this.wsStatusSubscription = this.ws.getWsStatusSubject().subscribe({
      next: (status) => this.onstatusChanged(status),
      error: (err) => this.onError(err)
    });
    this.isInitialized = true;
  }
  // 🧹 cleanup (VERY IMPORTANT if you want restart support)
  cleanupSubscriptions() {
    console.log("[nikki] Cleaning up subscriptions...");
    this.wsDataSubscription?.unsubscribe();
    this.wsStatusSubscription?.unsubscribe();
    this.wsDataSubscription = void 0;
    this.wsStatusSubscription = void 0;
    this.isInitialized = false;
  }
  onWsDataMsg(data) {
    try {
      this.wsConnectionStatus = "Active" /* Active */;
      if (data) {
        this.recentData = data;
        this.onData(data);
      }
    } catch (e) {
      console.error("Exception while onWsDataMsg:", e.message);
    }
  }
  getRecentMsg() {
    return this.recentData;
  }
  getConnectAddress(srvDef, token) {
    return serviceUtils.getWsConnectUrl(srvDef, token);
  }
  loadFromUrl() {
    let status = false;
    try {
      const devkeys = serviceUtils.decodeUrlInformation();
      if (devkeys && devkeys.servDef && devkeys.token) {
        this.servDef = devkeys.servDef;
        this.connectAddr = devkeys.wsAddr;
        this.token = devkeys.token;
        status = true;
      } else {
        console.error("Invalid URL.");
      }
    } catch (e) {
      console.error("Exception while loadFromUrl:", e.message);
    }
    return status;
  }
  async loadDefinitionsFromServer() {
    try {
      const defResponse = await fetch("/serviceDef.json");
      if (!defResponse.ok) throw new Error("serviceDef.json not found");
      const serviceDef = await defResponse.json();
      const tokenResponse = await fetch("/serviceToken.json");
      if (!tokenResponse.ok) throw new Error("serviceToken.json not found");
      const serviceToken = await tokenResponse.json();
      if (serviceDef && serviceDef.GuID && serviceDef.servID && serviceDef.name && serviceToken && serviceToken.secrete && serviceToken.sessionID && serviceToken.wsAddr) {
        this.servDef = serviceDef;
        this.token = serviceToken;
        console.info("loaded service definition.", this.servDef, this.token);
      } else {
        console.error("Invalid service definition or service token information. Please check the files");
      }
    } catch (err) {
      console.error("Error loading Nikki service files:", err);
      return null;
    }
  }
  async setServiceDef(serviceDef) {
    try {
      if (serviceDef && serviceDef.GuID && serviceDef.servID && serviceDef.name) {
        this.servDef = serviceDef;
        console.info("loaded service definition.");
      } else {
        console.error("Invalid service definition . Please check the files");
      }
    } catch (err) {
      console.error("Error loading Nikki service files:", err);
      return null;
    }
  }
  async setTokenDef(serviceToken) {
    try {
      if (serviceToken && serviceToken.secrete && serviceToken.sessionID && serviceToken.wsAddr) {
        this.token = serviceToken;
        console.info("loaded service token .");
      } else {
        console.error("Invalid service definition or service token information. Please check the files");
      }
    } catch (err) {
      console.error("Error loading Nikki service files:", err);
      return null;
    }
  }
  loadServiceDefFile(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          this.servDef = JSON.parse(e.target.result);
          console.log("Loaded serviceDef file");
        } catch (err) {
          console.error("Invalid JSON file:", err);
        }
      };
      reader.readAsText(file);
    } catch (e) {
      console.error("exception while, loadServiceDefFile ", e.message);
    }
  }
  // todo add name checks
  loadServiceTokenFile(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          this.token = JSON.parse(e.target.result);
          console.log("Loaded token file");
        } catch (err) {
          console.error("Invalid JSON file:", err);
        }
      };
      reader.readAsText(file);
    } catch (e) {
      console.error("exception while, loadServiceTokenFile ", e.message);
    }
  }
  start() {
    this.initSubscriptions();
    if (this.servDef && this.token && !this.isConnected()) {
      this.connectAddr = this.getConnectAddress(this.servDef, this.token);
      this.startWithDef(this.servDef, this.token);
    } else {
      console.error("Session is not set properly. Please set the service definition and service token");
    }
  }
  async startWithDef(srv, token) {
    let optStatus = false;
    try {
      console.info("Starting connection.");
      this.servDef = srv;
      this.token = token;
      if (this.servDef && this.token && this.connectAddr && this.connectAddr.length > 0) {
        if (this.ws === void 0) {
          this.ws = new wsHandlerImpl();
        }
        this.ws.connect(this.connectAddr);
        optStatus = true;
      } else {
        console.error("Failed to load service and token definition file.");
        alert("Session is not initialized!");
      }
    } catch (e) {
      console.error("Exception while startWithDef:", e.message);
    }
    return optStatus;
  }
  stop() {
    try {
      if (this.ws) {
        this.ws.disconnect();
        this.wsConnectionStatus = "Inactive" /* Inactive */;
      }
    } catch (e) {
      console.error("Exception while stop:", e.message);
    }
  }
  getNodedata(data = {}) {
    let nData = void 0;
    let dtStr = "";
    if (data) {
      try {
        dtStr = JSON.stringify(data);
      } catch (e) {
        console.error("Exception while getNodedata:", e.message);
      }
      if (dtStr.length > outDataSizeSegmentMaxLimit) {
        console.error(`Input data size is ${dtStr.length}, sending data limit exceeded, it should be less than ${outDataSizeSegmentMaxLimit}`);
        return void 0;
      }
    } else {
      console.error("Invalid input: send some valid data");
      return void 0;
    }
    if (this.servDef && this.token && data) {
      nData = new wsServiceSendDataMsg();
      nData.GuID = this.servDef.GuID;
      nData.dispName = this.servDef.dispName;
      nData.servID = this.servDef.servID;
      nData.name = this.servDef.name;
      nData.instID = this.servDef.instID;
      nData.secrete = this.token.secrete;
      nData.sessionID = this.token.sessionID;
      nData.data = data;
    }
    return nData;
  }
  // ==============================
  // SAFE BUFFER CHECK
  // ==============================
  getBufferedAmount() {
    if (!this.ws) return 0;
    return this.ws.bufferedAmount ?? this.ws.ws?.bufferedAmount ?? 0;
  }
  // ==============================
  // PUBLIC API
  // ==============================
  sendData(message) {
    if (!message || typeof message !== "object" && typeof message !== "string" && typeof message !== "number") {
      console.error("\u274C Invalid message");
      return false;
    }
    if (!this.ws || !this.token || !this.servDef) {
      console.error("\u274C Not initialized (ws/token/servDef missing)");
      return false;
    }
    if (!this.ws.getConnectionStatus?.()) {
      console.error("\u274C WebSocket not connected");
      return false;
    }
    let strMsg;
    try {
      const srvData = this.getNodedata(message);
      if (!srvData) {
        console.error("\u274C getNodedata returned empty");
        return false;
      }
      strMsg = JSON.stringify(srvData);
    } catch (err) {
      console.error("\u274C Data preparation failed:", err.message);
      return false;
    }
    const byteSize = new TextEncoder().encode(strMsg).length;
    if (byteSize > this.MAX_OUTGOING_SIZE_BYTES) {
      console.error(`\u274C Payload too large: ${byteSize} bytes`);
      return false;
    }
    if (this.sendQueue.length >= this.MAX_QUEUE_SIZE) {
      console.warn("\u26A0\uFE0F Send queue full. Dropping message.");
      this.onBackpressure?.(this.sendQueue.length);
      return false;
    }
    this.sendQueue.push(strMsg);
    this.flushQueue();
    return true;
  }
  flushQueue() {
    if (this.isFlushing) return;
    this.isFlushing = true;
    const process = () => {
      try {
        const now = Date.now();
        const RATE_LIMIT = Number(this.token?.rateLimit) || 1;
        this.sentTimestamps = this.sentTimestamps.filter(
          (ts) => now - ts < this.RATE_WINDOW_MS
        );
        if (this.sentTimestamps.length >= RATE_LIMIT) {
          setTimeout(process, 50);
          this.onRateLimit?.();
          return;
        }
        if (this.sendQueue.length === 0) {
          this.isFlushing = false;
          return;
        }
        const buffered = this.getBufferedAmount();
        if (buffered > this.MAX_BUFFERED_AMOUNT_BYTES) {
          console.warn(`\u26A0\uFE0F WS buffer high (${buffered}). Pausing...`);
          this.onBackpressure?.(buffered);
          setTimeout(process, 100);
          return;
        }
        const msg = this.sendQueue.shift();
        try {
          this.ws.sendMessage(msg);
          this.sentTimestamps.push(now);
          this.onSendSuccess?.(msg);
        } catch (err) {
          console.error("\u274C sendMessage failed:", err.message);
          this.onSendError?.(err, msg);
        }
        setTimeout(process, 0);
      } catch (err) {
        console.error("\u274C flushQueue crash:", err);
        this.isFlushing = false;
      }
    };
    process();
  }
  onBackpressure(size) {
    console.warn(`\u26A0\uFE0F Backpressure: buffer=${size}`);
  }
  onRateLimit() {
    console.warn("\u23F3 Rate limited...");
  }
  onSendSuccess(msg) {
    console.log("\u{1F4E4} Sent:", msg);
  }
  onSendError(err, msg) {
    console.log("\u{1F4E4} Sent: onSendError", msg);
  }
  isConnected() {
    const status = this.ws.getConnectionStatus();
    console.debug(`${this.LOG_PREFIX} Connection status:`, status);
    return status;
  }
  onConnect() {
    console.info(`${this.LOG_PREFIX} Connection established.`);
  }
  onDisconnect() {
    console.warn(`${this.LOG_PREFIX} Connection closed.`);
  }
  onError(error) {
    console.error(`${this.LOG_PREFIX} Connection error:`, error);
  }
  onData(data) {
    console.debug(`${this.LOG_PREFIX} Data received:`, data);
  }
};

// src/index.ts
var nikkiServiceBase = class extends nikkiServiceBaseImpl {
};
export {
  nikkiServiceBase
};
//# sourceMappingURL=nikki.mjs.map