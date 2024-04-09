<script>
    import { signOut } from "@auth/sveltekit/client";
    import logo from '$lib/images/logo_no_slogan.svg';
</script>

<nav>
    <img src={logo} alt="Logo" />
    <ul>

    </ul>
    <div class="end">
        <button on:click={() => signOut()}>Sign Out</button>>
    </div>
</nav>

<style>

nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        background: #2a2a2a;
    }

    nav img {
        width: 100px;
        padding: 0 10px;
    }

    nav ul {
        display: flex;
        list-style: none;
    }

    nav ul li {
        margin-right: 10px;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    nav button {
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        background: #333;
        border-radius: 5px;
        border: none;
    }

    nav button:hover {
        background: #555;
    }

    nav .end {
        display: flex;
        align-items: center;
        padding-right: 10px;
    }
</style>
