import React, {useEffect, useState} from 'react';
import { ControlledEditor, ControlledEditorProps, monaco } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
export type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema;
    initialValue?: object;
    onChange?: (value: object, ev: any) => void;
    onError?: (error: Error, ev: any) => void;
}

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    schema,
    initialValue,
    onChange,
    onError,
    ...otherProps
}: MonacoJsonEditorProps) {
    const [value, setValue] = useState<string | undefined>("");

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
        }
    }, [schema]);

    return (
        <ControlledEditor
            {...otherProps}
            width={width}
            height={height}
            value={value}
            onChange={(ev, value) => {
                try {
                    const data = value && JSON.parse(value);
                    onChange?.(data, ev);
                } catch (e) {
                    onError?.(e, ev);
                }
            }}
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
