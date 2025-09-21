<script>
    import "../app.css";
    import { Input, InputAddon, ButtonGroup, Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { SearchSolid, UserCircleSolid } from "flowbite-svelte-icons";
    import { Drawer, CardPlaceholder } from "flowbite-svelte";
  import { InfoCircleSolid, ArrowRightOutline } from "flowbite-svelte-icons";

  let open5 = $state(false);
  let placement = $state("right");


  // input login
  let title = "";
  let email = "";
  let password = "";
</script>

<!-- nav -->
<div class="w-[100vw] h-20 border-b border-black/30 flex justify-around items-center bg-linear-65 from-pink-100 to-orange-100">
    <ButtonGroup class="w-1/2 bg-white dark:bg-gray-950">
        <InputAddon class="bg-gray-700">
           <SearchSolid class="shrink-0 h-6 w-6" />
        </InputAddon>
        <Input id="website-admin" placeholder="Search..." class="bg-transparent dark:text-white"/>
    </ButtonGroup>
   <Button class="text-black rounded-full bg-red-500">Create Item</Button>
    <Dropdown simple>
        <DropdownItem><Button onclick={() => ((placement = "right"), (open5 = true))} class="text-black">Login</Button></DropdownItem>
    </Dropdown>
</div>






<div class="w-[100vw] h-[91vh] bg-linear-65 from-pink-50 to-orange-50 flex">
    <div class="w-1/2 h-full border-r-[1px] border-black/20 p-2 gap-2">
        <button type="button" class="w-full h-15 px-1 flex justify-start items-center my-1 hover:bg-red-100/50">
            <div class="w-15 h-15 rounded-2xl bg-white shadow mx-2 flex justify-center items-center"><UserCircleSolid class="shrink-0 h-6 w-6" /></div>
            <h1 class="">Lorem ipsum dolor.</h1>
        </button>
    </div>
    <div class="w-1/2 h-full p-3 flex flex-col gap-2">
        <input type="text" class="rounded-md outline-0" value="Lorem ipsum dolor." />
        <input type="text" class="rounded-md outline-0" value="Lorem ipsum dolor." />
        <input type="text" class="rounded-md outline-0" value="Lorem ipsum dolor." />
        <textarea name="" id="" class="w-full h-100 rounded-md">Lorem ipsum dolor.</textarea>
    </div>
</div>





<!-- drawer -->
<Drawer {placement} bind:open={open5}>
    <div class="w-full h-auto mt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <input type="text" name="" id="" class="border w-full rounded-md" placeholder="Title"/>
            <input type="email" name="" id="" class="border w-full rounded-md" placeholder="Email"/>
            <input type="text" name="" id="" class="border w-full rounded-md" placeholder="Password"/>
            <h1 class="">Note</h1>
            <textarea name="" id="" class="w-full h-100 rounded-md"></textarea>

        </div>
    </div>
</Drawer>