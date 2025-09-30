<script>
  import "../app.css";
    import { Input, InputAddon, ButtonGroup, Button, Dropdown, DropdownItem, DarkMode } from "flowbite-svelte";
    import { ClipboardCleanSolid, PenSolid, SearchSolid, UserSolid } from "flowbite-svelte-icons";
    import { Drawer, CardPlaceholder } from "flowbite-svelte";
    import { InfoCircleSolid, ArrowRightOutline } from "flowbite-svelte-icons";

    	import { onMount } from 'svelte';

	let otp = '';

	onMount(async () => {
		const [{ authenticator }, { Buffer }] = await Promise.all([
			import('otplib'),
			import('buffer')
		]);

		window.Buffer = Buffer;

		const secret = import.meta.env.VITE_API_SECRET;

		const updateOtp = () => {
			otp = authenticator.generate(secret);
		};

		updateOtp();
		const interval = setInterval(updateOtp, 30_000);
		return () => clearInterval(interval);
	});

    import { encryptVault, decryptVault } from '$lib/crypto-client.js';

    // drawer input
  let open5 = $state(false);
  let placement = $state("right");


  // list left data
  let data = $state([
    {
      title :"tony hhahshshsh",
      email : "naimm@gmail.com",
      password : "123",
      note : "123",
      url : "google.com",
    },
    {
      title :"naim",
      email : "naimmmmab@gmail.com",
      password : "123",
      note : "jaga deggan baik",
      url : "github.com",
    },
    {
      title :"naim",
      email : "naimmmmab@gmail.com",
      password : "123",
      note : "jaga deggan baik",
      url : "photos.google.com",
    },
  ]);


  // input login
  let title = $state("");
  let email = $state("");
  let password = $state("");
  let note = $state("");
  let url = $state("");


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
    console.log(result)
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
        url,
    },
    ];
    open5 = false; title = ""; email = "";password = ""; note = "";url = "";
}




</script>
<!-- nav -->
<div class="w-[100vw] h-26 border-b border-black/30 flex flex-col items-center bg-white dark:bg-gray-900 dark:text-white">
  <div class="w-full h-20 flex items-center justify-center ">
    <img src="./favicon.webp" alt="" class="w-10 rounded-full">
    <ButtonGroup class="w-1/2 bg-white dark:bg-gray-950">
        <InputAddon class="bg-gray-900">
           <SearchSolid class="text-white h-6 w-6" />
        </InputAddon>
        <Input id="website-admin" placeholder="Search..." class="bg-transparent dark:text-white"/>
    </ButtonGroup>
    <button class="rounded-xl p-2 border border-green-500 text-green-800 dark:text-green-300 bg-green-500/20">Create</button>
    <Dropdown simple>
         <DropdownItem><Button onclick={() => ((placement = "right"), (open5 = true))} class="text-black dark:text-white"><UserSolid class="shrink-0 h-6 w-6" />Login</Button></DropdownItem>
    </Dropdown>
    <DarkMode />
  </div>
  <div class="w-full h-17  flex items-center justify-start gap-2">
    <button type="button" onclick={expoRT} class="border p-2 rounded-xl bg-yellow-500/20 dark:text-yellow-200 border-yellow-500 shadow text-yellow-800 dark:bg-wite">Export</button>
    <button type="button" onclick={importVault} class="border p-2 rounded-xl bg-blue-500/20 dark:text-blue-200 border-blue-500 shadow text-blue-800 dark:bg-wite">Import</button>
  </div>
</div>






<div class="w-[100vw] h-[91vh] bg-linear-65 from-sky-100 to-white flex dark:from-sky-950 dark:to-gray-900 dark:text-white dark:border-white">
    <!-- list -->
    <div class="w-1/3 h-full overflow-y-scroll border-r-[1px] border-black/20 p-2 gap-2">
        {#each [...data].reverse() as dat}
        <button type="button" class="w-full overflow-hidden h-15 bg-white dark:bg-black rounded-md px-1 flex justify-start items-center my-1 shadow hover:shadow-blue-300/40" onclick={() => { datHeiglight = dat;}}>
             <!-- <FileCopySolid class="shrink-0 h-6 w-6 text-blue-500" /> -->
              <div class="w-10 h-10 mr-2 flex justify-center items-center"><img src={`https://${dat.url}/favicon.ico`} alt="" class="shadow shadow-white rounded-full w-full object-cover bg-white"></div>
              <div class="flex whitespace-nowrap">{dat.title}</div>
          </button>
        {/each}
    </div>
          
    <!-- heiglight -->
    <div class="w-full h-full p-3 flex flex-col gap-2 dark:bg-gray-800">
        <!-- <div class="w-full h-15 flex justify-end items-center">
        </div> -->
        {#if data.length >= 1}
         <div class="flex">
           <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <input type="text" class="w-full dark:bg-black rounded-md outline-0" value={datHeiglight.title} placeholder="title"/>
         </div>
         <div class="flex">
           <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <input type="email" class="w-full dark:bg-black rounded-md outline-0" value={datHeiglight.email} placeholder="email"/>
         </div>
         <div class="flex">
           <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <input type="text" class="w-full dark:bg-black rounded-md outline-0" value={datHeiglight.password} placeholder="password"/>
         </div>
         <div class="flex">
          <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <h1 class="w-full bg-gray-900 text-2xl p-2 rounded-xl">{otp}</h1>
         </div>
         <div class="flex">
           <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <textarea name="" id="" class="w-full h-100 dark:bg-black rounded-md">{datHeiglight.note}</textarea>
         </div>
         <div class="flex">
           <ClipboardCleanSolid class="text-gray-700 mr-2 hover:text-white shrink-0 h-6 w-6" />
          <input type="text" class="w-full dark:bg-black rounded-md outline-0" placeholder="Website" value={datHeiglight.url}/>
         </div>
          <div class="w-full border border-black/30 bg-gray-200 dark:bg-gray-900 p-2 rounded-md font-thin">
            <h1 class="">midifikasi : 12-09-2025</h1>
            <h1 class="">dibuat : 12-08-2025</h1>
          </div>
          <button type="button" class="bg-yellow-500 p-2 rounded-xl">Save</button>
          {:else}
          <div class="w-full h-full flex justify-center">
            <div class="flex w-72 m-auto gap-2">
              <img src="./favicon.webp" alt="" class="w-15 rounded-xl">
              <h1 class="text-2xl">Welcome to zkfs, an application that you can rely on to encrypt your data even if you don't trust the device you use yourself.</h1>
            </div>
          </div>
        {/if}

    </div>
</div>





<!-- drawer -->
<Drawer {placement} bind:open={open5}>
    <div class="w-full h-auto mt-10 flex flex-col dark:text-white">
        <div class="flex flex-col gap-2">
            <input type="text" class="border w-full dark:bg-black rounded-md" placeholder="Title" bind:value={title}/>
            <input type="email" class="border w-full dark:bg-black rounded-md" placeholder="Email" bind:value={email}/>
            <input type="text" class="border w-full dark:bg-black rounded-md" placeholder="Password" bind:value={password}/>
            <h1 class="">Note</h1>
            <textarea class="w-full dark:bg-black h-100 rounded-md" bind:value={note}></textarea>
            <input type="text" class="border w-full dark:bg-black rounded-md" placeholder="website" bind:value={url}/>
            <button type="button" class="p-2 rounded-md bg-amber-300" onclick={getInput}>Create</button>
        </div>
    </div>
</Drawer>