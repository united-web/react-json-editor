import React from 'react';
import MonacoJsonEditor from "../monaco-json-editor";
import jsonSchema from './json-schema-draft-07.json';

function Root() {
    return (
        <MonacoJsonEditor
            schema={jsonSchema}
            initialValue={{
                some: "name",
                value: "value"
            }}
            onChange={console.log}
            onError={console.log}
        />
    );
}

export default Root;
