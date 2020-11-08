/// <reference types="react" />
import { ControlledEditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
export declare type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema;
    initialValue?: object;
    onChange?: (value: object, ev: any) => void;
    onError?: (error: Error, ev: any) => void;
};
declare function MonacoJsonEditor({ width, height, options, schema, initialValue, onChange, onError, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
