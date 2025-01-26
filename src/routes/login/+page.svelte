<script>
import TextField from "$lib/components/generics/forms/TextField.svelte";

let email = "";
let password = "";

async function login() {
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}`;
        window.location.href = "/";
    } else {
        alert("Invalid credentials");
    }
}

let oauth = [
    {
        name: "Google",
        icon: "/google.png",
        url: "http://localhost:3000/auth/google"
    },
    {
        name: "Github",
        icon: "/github.svg",
        url: "http://localhost:3000/auth/facebook"
    }
];

</script>

<div class="w-full flex flex-col justify-center items-center">
    <a href="/" class="text-gray-900 text-2xl font-bold">
        <img src="logo_no_slogan.svg" alt="logo" width="300" class="mt-40"/>
    </a>

    <div class="w-80 flex flex-col justify-center items-center p-4 mt-20 rounded-lg bg-gray-600">

        <div class="flex justify-center items-center">
            {#each oauth as provider}
                <a href={provider.url} class="flex justify-center items-center p-2 rounded-lg bg-gray-900 text-white m-2">
                    <img src={provider.icon} alt={provider.name} width="20" class="mr-2"/>
                    <span>{provider.name}</span>
                </a>
            {/each}

        </div>

        <TextField label="Email" type="text" bind:value={email}/>
        <TextField label="Password" type="password" bind:value={password}/>
        <button class="w-32 bg-gray-900 text-white p-2 rounded-lg mt-4" on:click={login}>Login</button>
    </div>

    <div class="mt-4">
        <a href="/register" class="text-gray-900">Don't have an account? Register here</a>
    </div>
</div>