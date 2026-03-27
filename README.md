nikki.js
==========

**Official browser client library for the nikki.build service.**

👉 **Website:** [https://nikki.build](https://nikki.build)



## Overview
-----------
`nikki.js` allows web applications to connect directly to the nikki.build platform from the browser.
Designed for simplicity and real-time communication, this SDK enables browser-based services to send and receive structured JSON data across connected nodes.

### Key Features

* **Browser Native:** Works directly in modern browsers.
* **Reliable Connectivity:** Built-in connection management.
* **JSON Native:** Easy-to-use JSON data handling.
* **Lifecycle Events:** Built-in hooks for connection, data, and error states.
* **CDN Ready:** Single-file browser build.
* **TypeScript Ready:** Full type definitions included.
* **Extensible:** Built around a base class for custom logic.

	> The library supports modern browsers with WebSocket support.


---


## 1 Installation

#### Option 1 — CDN (Recommended for Browser Use)

```html
<script src="https://cdn.jsdelivr.net/npm/nikki.js@latest/dist/nikki.min.js"></script>
```

**The global namespace will be:**
```javascript
nikki
```

#### Option 2 — NPM
```bash
npm install nikki.js
```
then:
```bash
import { nikkiServiceBase } from "nikki.js";
```

---



Quick Start
-----------



### 1. Create Your Service
Extend the `nikkiServiceBase` class to handle your custom logic.

```typescript
import { nikkiServiceBase } from "nikki.js";

export class MyService extends nikkiServiceBase {
    onConnect(): void {
        console.info("Connected to nikki.build");
    }

    onDisconnect(): void {
        console.info("Disconnected from nikki.build");
    }

    onData(data: any): void {
        console.info("Received data:", data);
    }

    onError(errMsg: string): void {
        console.error("Error:", errMsg);
    }
}
```

### 2\. Start the Connection

Create an instance and start the connection:

```typescript
 const srvInst = new MyService()

// Connect to nikki.build
srvInst.start()
```

### 3\.📤 Sending Data

Send JSON data to other connected nodes:
```typescript
srvInst.sendData({ message: "Hello World" })
```

Example with interval:
```typescript
let count = 0

const interval = setInterval(() => {
    count++
    srvInst.sendData({ count })
    console.info("Sending data:", count)
}, 3000)
```

### 4\. To disconnect:

```typescript
srvInst.stop()
```


## 2 Initialize the Library

There are two ways to initialize `nikki.js`.


### 🔹 Option A — Load Configuration from Server (Recommended)

use these functions to set service definition and service token.
- setServiceDef
- setTokenDef


##### Start the Service

```typescript

// dynamically Loads configuration files

let srvDef = {} // your serviceDef file content
let srvToken = {} // your serviceToken file content

srvInst.setTokenDef(srvToken);
srvInst.setServiceDef(srvDef);

// Start connection
srvInst.start();

// todo : how to get the config files from playground?

```
This is the cleanest setup for production deployments.


### 🔹 Option B — Load Configuration from File Input

##### Useful for:
* **Local testing**
* **Manual configuration**
* **Debugging**

---

```html
<label>
    serviceDef.json:
    <input type="file" accept=".json" onchange="service.loadServiceDefFile(event)">
</label>
<label>
    serviceToken.json:
    <input type="file" accept=".json" onchange="service.loadServiceTokenFile(event)">
</label>
```




## 🔄 Lifecycle Methods

Override these methods in your service class:


| Callback            | Description                                                   |
|---------------------|---------------------------------------------------------------|
| `onConnect()`     | Triggered when a connection to nikki.build is successfully established. |
| `onDisconnect()`  | Triggered when the connection is closed or lost.            |
| `onError(errMsg)`   | Triggered whenever an error occurs.                          |
| `onData(jsonData)`  | Triggered when data is received from another connected node. |



## 🛠 Available Methods
| Method               | Description                       |
| -------------------- | --------------------------------- |
| `start()`            | Connect to nikki.build            |
| `stop()`             | Disconnect from nikki.build       |
| `sendData(jsonData)` | Send JSON data to connected nodes |
| `loadDefinitionsFromServer()` | Load config files from website root |
| `loadServiceDefFile(file)`    | Load service definition from file   |
| `loadServiceTokenFile(file)`  | Load token from file                |





### ⚠️ Rate Limits (Friendly Reminder)
--------------------------------------------
To keep everything running smoothly on the platform, there are a few limits to keep in mind:

- **Message Speed:** Please don’t send more than **2 messages per second**.  
  (Your service might be fast… but let’s not overwhelm things 😄)

- **Throttling:** If limits are exceeded, your connection may be temporarily throttled or disconnected.

- **Best Practice:** Design your service with these limits in mind — batching, debouncing, or simple timing controls work great.

Play nice, and everything stays happy 🚀


Example Use Cases
-----------------

*   **Real-time event processors**
    
*   **IoT Data streaming services**
    
*   **Monitoring and Alerting services**
    
*   **Backend integrations with nikki.build**
    

### Requirements
------------

Modern browser with WebSocket support

For NPM usage: Node.js >= 16 (for build tools only)
    

### Documentation & Support
-----------------------

For full platform documentation and advanced service configuration, visit:

👉 [https://nikki.build](https://nikki.build)

### License
-------

[ISC](https://opensource.org/licenses/ISC)

