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
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
function MonacoJsonEditor(_a) {
    var { width = '100%', height = 180, options, editorWillMount: willMount, schema } = _a, otherProps = __rest(_a, ["width", "height", "options", "editorWillMount", "schema"]);
    const editorWillMount = (monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                    uri: "http://json-schema-server/schema.json",
                    fileMatch: ['*'],
                    schema
                }]
        });
        if (willMount)
            willMount(monaco);
    };
    return (React.createElement(MonacoEditor, Object.assign({}, otherProps, { width: width, height: height, options: Object.assign(Object.assign({}, options), { minimap: Object.assign({ enabled: false }, options === null || options === void 0 ? void 0 : options.minimap) }), editorWillMount: editorWillMount, language: "json" })));
}
export default MonacoJsonEditor;
