import Link from 'next/link'

export default function Home() {
  return (
    <div style={{maxWidth:900, margin:"2rem auto", padding:20}}>
      <h1>Assessment Platform — Demo Frontend</h1>
      <p>Use the links below to navigate:</p>
      <ul>
        <li><Link href="/recruiter/generate">Recruiter: Generate Test from JD</Link></li>
        <li><Link href="/candidate/take/1">Candidate: Take Test (sample)</Link></li>
      </ul>
      <p style={{marginTop:20}}>Make sure NEXT_PUBLIC_API_URL is set to your backend URL.</p>
    </div>
  )
}
