import WorkerNav from "../../components/WorkerNav";
import Authorize from "../../components/Authorize";
export default function Layout({ children }) {
  return (
    <>
      <Authorize>
        <main className="flex flex-col h-screen w-full">
          <section className="flex-1 overflow-y-scroll">{children}</section>
          <section>
            <WorkerNav />
          </section>
        </main>
      </Authorize>
    </>
  );
}
