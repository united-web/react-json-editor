/// <reference types="react" />
import { ControlledEditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type OnChange = (value?: object, ev?: any) => void;
export declare type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
export declare type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema;
    initialValue?: object;
    onChange?: OnChange;
    onError?: (error: Error, ev: any) => void;
    onSchemaValid?: OnChange;
    onSchemaInvalid?: OnChange;
};
declare function MonacoJsonEditor({ width, height, options, schema, initialValue, onChange, onSchemaValid, onSchemaInvalid, onError, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
