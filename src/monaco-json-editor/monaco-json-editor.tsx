import React from 'react';
import MonacoEditor, { MonacoEditorProps, EditorWillMount } from 'react-monaco-editor';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type MonacoJsonEditorProps = Omit<MonacoEditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
}

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    editorWillMount: willMount,
    schema,
    ...otherProps
}: MonacoJsonEditorProps) {
    const editorWillMount: EditorWillMount = (monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                uri: "http://json-schema-server/schema.json",
                fileMatch: ['*'],
                schema
            }]
        });

        if (willMount) willMount(monaco);
    }

    return (
        <MonacoEditor
            {...otherProps}
            width={width}
            height={height}
            options={{
                ...options,
                minimap: {
                    enabled: false,
                    ...options?.minimap
                },
            }}
            editorWillMount={editorWillMount}
            language="json"
        />
    )
}

export default MonacoJsonEditor;
