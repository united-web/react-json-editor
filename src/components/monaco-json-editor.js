import React, { useRef, useEffect } from 'react';
//import { monaco } from '@monaco-editor/react';
import { ReactRenderer } from '@theia/core/src/browser/widgets/react-renderer'

const JsonEditor = () => {
    return <ReactRenderer />;
}

// const JsonEditor = () => {
//     const ref = useRef(null);
//     useEffect(() => {
//         let dispose;
//         monaco.init().then(monaco => {
//             const { editor, languages } = monaco;
//
//             languages.json.jsonDefaults.setDiagnosticsOptions({
//                 validate: true,
//                 schemas: [{
//                     fileMatch: '*',
//                     schema: {
//                         type: "object",
//                         properties: {
//                             p1: {
//                                 enum: ["v1", "v2"]
//                             }
//                         }
//                     }
//                 }]
//             });
//
//             const _editor = editor.create(ref.current, {
//                 value: '',
//                 language: 'json',
//                 minimap: {
//                     enabled: false
//                 }
//             });
//
//             _editor.getModel().onDidChangeContent = console.log;
//
//             editor.onDidChangeContent = console.log;
//             editor.onDidChangeContentModel = console.log;
//
//             //editor.model.onDidChangeContent = console.log;
//             console.log(_editor);
//
//             dispose = editor.dispose;
//         })
//         return dispose;
//     }, []);
//     return <div style={{height: 600}} ref={ref} />;
// };

export default JsonEditor;
