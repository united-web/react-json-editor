import React, {useEffect} from 'react';
import { ControlledEditor, ControlledEditorProps, monaco } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
    value?: any;
    onChange?: (value: any, ev: any) => any | void,
    onInvalid?: (value: any, ev: any) => any | void;
}

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    schema,
    value,
    onChange,
    onInvalid,
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

    const handleChange: ControlledEditorProps['onChange'] = (ev, value) => {
        try {
            const json = JSON.parse(value || '{}');
            if (typeof onChange === 'function') onChange(json, ev);
        } catch (error) {
            if (typeof onInvalid === 'function') onInvalid(value, ev);
        }
    }

    return (
        <ControlledEditor
            {...otherProps}
            width={width}
            height={height}
            value={JSON.stringify(value, null, 2)}
            onChange={handleChange}
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
