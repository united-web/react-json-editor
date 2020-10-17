/// <reference types="react" />
import { ControlledEditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language' | 'value' | 'onChange'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
    value?: any;
    onChange?: (value: any, ev: any) => any | void;
    onInvalid?: (value: any, ev: any) => any | void;
};
declare function MonacoJsonEditor({ width, height, options, schema, value, onChange, onInvalid, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
