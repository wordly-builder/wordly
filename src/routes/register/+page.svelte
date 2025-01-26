<script>
    import TextField from "$lib/components/generics/forms/TextField.svelte";

    let email = "";
    let username = "";
    let password = "";
    let confirmPassword = "";

    function register() {
        if (!email || !username || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                username,
                password
            })
        }).then(res => {
            if (res.ok) {
                window.location.href = "/login";
            } else {
                alert("An error occurred");
            }
        });
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
        <TextField label="Username" type="text" bind:value={username}/>
        <TextField label="Password" type="password" bind:value={password}/>
        <TextField label="Confirm Password" type="password" bind:value={confirmPassword}/>
        <button class="w-32 bg-gray-900 text-white p-2 rounded-lg mt-4" on:click={register}>
            Register
        </button>
    </div>

    <div class="mt-4">
        <a href="/login" class="text-gray-900">Already have an account? Login here</a>
    </div>
</div>