import dynamic from 'next/dynamic';
import React from 'react';
const MonacoEditor = dynamic(() => import('monaco-editor-react'), { ssr: false });

export default function CodeEditor({ language="python", value, onChange }) {
  return (
    <div style={{border:"1px solid #ddd"}}>
      <MonacoEditor height="350px" language={language} value={value} onChange={onChange} />
    </div>
  );
}
