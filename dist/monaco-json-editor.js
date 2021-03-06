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
import React, { useEffect, useState } from 'react';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import Ajv from 'ajv';
const ajv = new Ajv();
function MonacoJsonEditor(_a) {
    var { width = '100%', height = 180, options, schema, initialValue, onChange, onSchemaValid, onSchemaInvalid, onError } = _a, otherProps = __rest(_a, ["width", "height", "options", "schema", "initialValue", "onChange", "onSchemaValid", "onSchemaInvalid", "onError"]);
    const [value, setValue] = useState();
    const [validate, setValidate] = useState();
    useEffect(() => {
        const json = JSON.stringify(initialValue, null, 2);
        setValue(json);
    }, [initialValue]);
    useEffect(() => {
        if (typeof schema === 'object') {
            monaco.init().then(monaco => {
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: true,
                    schemas: [{
                            uri: "https://json.schemastore.org/",
                            fileMatch: ['*'],
                            schema
                        }]
                });
            });
            if (onSchemaValid || onSchemaInvalid) {
                const validate = ajv.compile(schema);
                setValidate(() => validate);
            }
        }
    }, [schema]);
    return (React.createElement(ControlledEditor, Object.assign({}, otherProps, { width: width, height: height, value: value, onChange: (ev, value) => {
            try {
                const data = value && JSON.parse(value);
                onChange === null || onChange === void 0 ? void 0 : onChange(data, ev);
                if (validate) {
                    const valid = validate(data);
                    if (valid)
                        onSchemaValid === null || onSchemaValid === void 0 ? void 0 : onSchemaValid(data, ev);
                    else
                        onSchemaInvalid === null || onSchemaInvalid === void 0 ? void 0 : onSchemaInvalid(data, ev);
                }
            }
            catch (e) {
                onError === null || onError === void 0 ? void 0 : onError(e, ev);
            }
        }, options: Object.assign(Object.assign({}, options), { minimap: Object.assign({ enabled: false }, options === null || options === void 0 ? void 0 : options.minimap) }), language: "json" })));
}
export default MonacoJsonEditor;
