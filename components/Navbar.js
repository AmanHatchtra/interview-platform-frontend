import Link from 'next/link';

export default function Navbar() {
  return (
    <div style={{display:"flex", gap:12}}>
      <Link href="/"><a>Home</a></Link>
      <Link href="/recruiter/generate"><a>Recruiter</a></Link>
      <Link href="/candidate/take/1"><a>Candidate</a></Link>
    </div>
  );
}
