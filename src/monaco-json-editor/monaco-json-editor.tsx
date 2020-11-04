import React, {useEffect} from 'react';
import { ControlledEditor, ControlledEditorProps, monaco } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
}

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    schema,
    value,
    onChange,
    ...otherProps
}: MonacoJsonEditorProps) {
    useEffect(() => {
        if (typeof schema === 'object') {
            monaco.init().then(monaco => {
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: true,
                    schemas: [{
                        uri: "http://json-schema-server/",
                        fileMatch: ['*'],
                        schema
                    }]
                });
            });
        }
    }, [schema]);

    return (
        <ControlledEditor
            {...otherProps}
            width={width}
            height={height}
            value={value}
            onChange={onChange}
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
