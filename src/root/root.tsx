import React from 'react';
import MonacoJsonEditor from "../monaco-json-editor";

function Root() {
    return (
        <MonacoJsonEditor schema={{
            properties: {
                some: {
                    enum: [1,2,3]
                }
            }
        }} />
    );
}

export default Root;
