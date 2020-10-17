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
import React, { useEffect } from 'react';
import { ControlledEditor, monaco } from '@monaco-editor/react';
function MonacoJsonEditor(_a) {
    var { width = '100%', height = 180, options, schema, value, onChange, onInvalid } = _a, otherProps = __rest(_a, ["width", "height", "options", "schema", "value", "onChange", "onInvalid"]);
    useEffect(() => {
        monaco.init().then(monaco => {
            if (typeof schema === 'object') {
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: true,
                    schemas: [{
                            uri: "http://json-schema-server/",
                            fileMatch: ['*'],
                            schema
                        }]
                });
            }
        });
    }, []);
    const handleChange = (ev, value) => {
        let json;
        try {
            json = JSON.parse(value || '{}');
            if (typeof onChange === 'function')
                onChange(json, ev);
        }
        catch (error) {
            if (typeof onInvalid === 'function')
                onInvalid(value, ev);
        }
    };
    return (React.createElement(ControlledEditor, Object.assign({}, otherProps, { width: width, height: height, value: JSON.stringify(value, null, 2), onChange: handleChange, options: Object.assign(Object.assign({}, options), { minimap: Object.assign({ enabled: false }, options === null || options === void 0 ? void 0 : options.minimap) }), language: "json" })));
}
export default MonacoJsonEditor;
