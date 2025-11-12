import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const MonacoEditor = dynamic(() => import("monaco-editor-react"), { ssr: false });

export default function Take() {
  const router = useRouter();
  const { id } = router.query;
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [code, setCode] = useState(`print("Hello world")`);
  const [result, setResult] = useState(null);
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function submitCode() {
    try {
      const res = await axios.post(`${API}/v1/submit_code`, { source_code: code, language_id: 71 });
      setResult(res.data.judge0 || res.data);
    } catch (err) {
      alert("Error submitting code. See console.");
      console.error(err);
    }
  }

  return (
    <div style={{maxWidth:1000, margin:"2rem auto", padding:20}}>
      <h1>Candidate Test — {id}</h1>

      <section style={{marginTop:20}}>
        <h3>MCQ sample</h3>
        <p>1) What is Python?</p>
        <div><label><input type="radio" name="a" onChange={()=>setMcqAnswer("snake")} /> A snake</label></div>
        <div><label><input type="radio" name="a" onChange={()=>setMcqAnswer("lang")} /> A programming language</label></div>
      </section>

      <section style={{marginTop:20}}>
        <h3>Code Editor (Python)</h3>
        <div style={{height:320, border:"1px solid #ddd"}}>
          <MonacoEditor height="300px" language="python" value={code} onChange={(v)=>setCode(v)} />
        </div>
        <div style={{marginTop:8}}>
          <button onClick={submitCode} style={{padding:"8px 14px"}}>Run Code</button>
        </div>
        {result && <pre style={{background:"#f6f7f9", padding:12, marginTop:12}}>{JSON.stringify(result, null, 2)}</pre>}
      </section>
    </div>
  );
}
