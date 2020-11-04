/// <reference types="react" />
import { ControlledEditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type MonacoJsonEditorProps = Omit<ControlledEditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7 | object;
};
declare function MonacoJsonEditor({ width, height, options, schema, value, onChange, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
