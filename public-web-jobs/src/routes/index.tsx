import { $, Fragment, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useJobs = routeLoader$(async () => {
  const request = await fetch("http://private-proxy/job-api/jobs");
  const data = await request.json();

  return data as any[];
})

export default component$(() => {
  const jobsServer = useJobs();
  const jobs = useSignal(jobsServer.value);

  const refetch = $(async () => {
    const request = await fetch("http://api.ekerdev.local.com/job-api/jobs");
    const data = await request.json();
  
    jobs.value = data as any[];
  })

  return (
    <>
      {JSON.stringify(jobs.value)}
      <br />
      <button onClick$={refetch}>Refetch</button>
      <a href="http://ekerdev.local.com">Go to home</a>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
