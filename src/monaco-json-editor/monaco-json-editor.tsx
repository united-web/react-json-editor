import React, {useEffect, useState} from 'react';
import { ControlledEditor, ControlledEditorProps, monaco } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
import Ajv from 'ajv';

export type OnChange = (value?: object, ev?: any) => void;
export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
export type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema;
    initialValue?: object;
    onChange?: OnChange;
    onError?: (error: Error, ev: any) => void;
    onSchemaValid?: OnChange;
    onSchemaInvalid?: OnChange;
}

const ajv = new Ajv();

function MonacoJsonEditor({
    width = '100%',
    height = 180,
    options,
    schema,
    initialValue,
    onChange,
    onSchemaValid,
    onSchemaInvalid,
    onError,
    ...otherProps
}: MonacoJsonEditorProps) {
    const [value, setValue] = useState<string>();
    const [validate, setValidate] = useState<Ajv.ValidateFunction>();

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

                    if (validate) {
                        const valid = validate(data);
                        if (valid) onSchemaValid?.(data, ev)
                        else onSchemaInvalid?.(data, ev);
                    }
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
