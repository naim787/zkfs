<script>
  import "../app.css";
    import { Input, InputAddon, ButtonGroup, Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { SearchSolid, UserCircleSolid } from "flowbite-svelte-icons";
    import { Drawer, CardPlaceholder } from "flowbite-svelte";
    import { InfoCircleSolid, ArrowRightOutline } from "flowbite-svelte-icons";
    
    import { encryptVault, decryptVault } from '$lib/crypto-client.js';
    
  let open5 = $state(false);
  let placement = $state("right");

  let data = $state([
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
  {
    title: "Lorem ipsum dolor.",
    email: "naim@gmail.com",
    password: "123",
    note: "Lorem ipsum dolor.",
  },
]);


  // input login
let title = $state("");
let email = $state("");
let password = $state("");
let note = $state("");


// e2ee

  let masterPassword = "123";

  async function expoRT() {
    const result = await encryptVault(data, masterPassword);

    const res = await fetch('/api/vault', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });

    const hasil = await res.json();
    console.log("Vault encrypted & sent to server:", hasil);
  }

  async function importVault() {
    const res = await fetch('/api/vault');
    const stored = await res.json();

    const result = await decryptVault(
      stored.ciphertext,
      masterPassword,
      stored.salt,
      stored.iv
    );

    data = JSON.parse(result);
  }

// data heiglight
let datHeiglight = $state({});

function getInput() {
    data = [
    ...data, {
        title,
        email,
        password,
        note,
    },
    ];
}




</script>

<!-- nav -->
<div class="w-[100vw] h-20 border-b border-black/30 flex justify-around items-center bg-linear-65 from-pink-100 to-orange-100">
    <ButtonGroup class="w-1/2 bg-white dark:bg-gray-950">
        <InputAddon class="bg-gray-100">
           <SearchSolid class="shrink-0 h-6 w-6" />
        </InputAddon>
        <Input id="website-admin" placeholder="Search..." class="bg-transparent dark:text-white"/>
    </ButtonGroup>
   <Button on:click={expoRT} class="bg-yellow-500">Export</Button>
<Button on:click={importVault} class="bg-green-500">Import</Button>
   <Button class="text-black rounded-full bg-red-500">Create Item</Button>
    <Dropdown simple>
        <DropdownItem><Button onclick={() => ((placement = "right"), (open5 = true))} class="text-black">Login</Button></DropdownItem>
    </Dropdown>
</div>






<div class="w-[100vw] h-[91vh] bg-linear-65 from-pink-50 to-orange-50 flex">
    <!-- list -->
    <div class="w-1/2 h-full overflow-y-scroll border-r-[1px] border-black/20 p-2 gap-2">
      {#each data as dat}
        <button type="button" class="w-full h-15 px-1 flex justify-start items-center my-1 hover:bg-red-100/50" onclick={() => {
            datHeiglight = dat;
        }}>
            <div class="w-15 h-15 rounded-2xl bg-white shadow mx-2 flex justify-center items-center"><UserCircleSolid class="shrink-0 h-6 w-6" /></div>
            <h1 class="">{dat.title}</h1>
        </button>
      {/each}

    </div>
    <!-- heiglight -->
    <div class="w-1/2 h-full p-3 flex flex-col gap-2">
        <input type="text" class="rounded-md outline-0" value={datHeiglight.title} placeholder="title"/>
        <input type="email" class="rounded-md outline-0" value={datHeiglight.email} placeholder="email"/>
        <input type="text" class="rounded-md outline-0" value={datHeiglight.password} placeholder="password"/>
        <textarea name="" id="" class="w-full h-100 rounded-md">{datHeiglight.note}</textarea>
    </div>
</div>





<!-- drawer -->
<Drawer {placement} bind:open={open5}>
    <div class="w-full h-auto mt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <input type="text" name="" id="" class="border w-full rounded-md" placeholder="Title" bind:value={title}/>
            <input type="email" name="" id="" class="border w-full rounded-md" placeholder="Email" bind:value={email}/>
            <input type="text" name="" id="" class="border w-full rounded-md" placeholder="Password" bind:value={password}/>
            <h1 class="">Note</h1>
            <textarea name="" id="" class="w-full h-100 rounded-md" bind:value={note}></textarea>
            <button type="button" class="p-2 rounded-md bg-amber-300" onclick={getInput}>Create</button>
        </div>
    </div>
</Drawer>