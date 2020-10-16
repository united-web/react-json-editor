import React, {useEffect} from 'react';
import MonacoEditor, { monaco, EditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type MonacoJsonEditorProps = Omit<EditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
}

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    schema,
    ...otherProps
}: MonacoJsonEditorProps) {
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
            language="json"
        />
    )
}

export default MonacoJsonEditor;
