'use client'

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 gap-6">
      <div className="w-full rounded-xl bg-primary py-4 text-center text-white font-bold" onClick={() => window.location.href = "/ContractorLogin"}>
        <h1>Contractor</h1>
      </div>
      <div className="w-full rounded-xl bg-primary py-4 text-center text-white font-bold" onClick={() => window.location.href = "/WorkerLogin"}>
        <h1>Worker</h1>
      </div>
    </div>
  );
}
