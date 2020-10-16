/// <reference types="react" />
import { EditorProps } from '@monaco-editor/react';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type MonacoJsonEditorProps = Omit<EditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
};
declare function MonacoJsonEditor({ width, height, options, schema, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
