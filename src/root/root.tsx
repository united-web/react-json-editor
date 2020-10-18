import React from 'react';
import MonacoJsonEditor from "../monaco-json-editor";
import jsonSchema from './json-schema-draft-07.json';

function Root() {
    return (
        <MonacoJsonEditor
            schema={jsonSchema}
            onChange={console.log}
            onInvalid={console.log}
        />
    );
}

export default Root;
