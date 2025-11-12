import { useState } from "react";
import axios from "axios";

export default function Generate() {
  const [title, setTitle] = useState("");
  const [jd, setJd] = useState("");
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/v1/generate_questions`, {
        job_title: title,
        jd_text: jd,
        difficulty: "intermediate"
      });
      setQuestions(res.data.questions || res.data);
    } catch (err) {
      alert("Error generating questions. See console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadSample() {
    const resp = await fetch('/sample_jds.json');
    const json = await resp.json();
    setTitle(json[0].title);
    setJd(json[0].jd);
  }

  return (
    <div style={{maxWidth:900, margin:"2rem auto", padding:20}}>
      <h1>Generate Assessment from JD</h1>

      <div style={{marginTop:12}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job Title" style={{width:"100%", padding:8, marginBottom:8}} />
        <textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste job description here" rows={10} style={{width:"100%", padding:8}} />
      </div>

      <div style={{marginTop:8}}>
        <button onClick={handleGenerate} style={{padding:"8px 14px", marginRight:8}}>{loading ? "Generating..." : "Generate"}</button>
        <button onClick={loadSample} style={{padding:"8px 14px"}}>Load sample JD</button>
      </div>

      {questions && (
        <div style={{marginTop:20, background:"#f7f9fb", padding:12}}>
          <h2>Generated Questions</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(questions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
