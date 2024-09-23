import { $, Fragment, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, type DocumentHead } from "@builder.io/qwik-city";

export const useUsers = routeLoader$(async () => {
  const request = await fetch("http://private-proxy/user-api/users");
  const data = await request.json();

  return data as any[];
})

export const createUser = server$(async (name: string, age: number) => {
  const request = await fetch("http://private-proxy/user-api/user", { 
    method: "POST", 
    body: JSON.stringify({ name, age }) 
  })

  return await request.json();
})

export default component$(() => {
  const usersServer = useUsers();

  const name = useSignal("");
  const age = useSignal("");
  const users = useSignal(usersServer.value);

  const refetch = $(async () => {
    const request = await fetch("http://api.ekerdev.local.com/user-api/users");
    const data = await request.json();
  
    users.value = data as any[];
  })

  const addUser = $(async () => {
    users.value = await createUser(name.value, +age.value);
  })

  return (
    <>
      {JSON.stringify(users.value)}
      <br />
      <button onClick$={refetch}>Refetch</button>
      <a href="http://jobs.ekerdev.local.com">Go to jobs</a>
      <br />
      <input type="text" name="name" bind:value={name} />
      <input type="number" name="age" bind:value={age} />
      <button onClick$={addUser}>Create</button>
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
