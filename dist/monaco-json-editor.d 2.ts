/// <reference types="react" />
import { MonacoEditorProps } from 'react-monaco-editor';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type MonacoJsonEditorProps = Omit<MonacoEditorProps, 'language'> & {
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
};
declare function MonacoJsonEditor({ width, height, options, editorWillMount: willMount, schema, ...otherProps }: MonacoJsonEditorProps): JSX.Element;
export default MonacoJsonEditor;
