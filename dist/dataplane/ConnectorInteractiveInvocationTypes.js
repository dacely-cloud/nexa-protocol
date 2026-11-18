// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** An explicit signed grant selects the native I/O mechanism. */
export var ConnectorInteractiveTransport;
(function (ConnectorInteractiveTransport) {
    ConnectorInteractiveTransport["Pipe"] = "pipe";
    ConnectorInteractiveTransport["Pty"] = "pty";
})(ConnectorInteractiveTransport || (ConnectorInteractiveTransport = {}));
/** Data, pipe EOF and terminal resize are distinct immutable operations. */
export var ConnectorInputKind;
(function (ConnectorInputKind) {
    ConnectorInputKind["Data"] = "data";
    ConnectorInputKind["End"] = "end";
    ConnectorInputKind["Resize"] = "resize";
})(ConnectorInputKind || (ConnectorInputKind = {}));
