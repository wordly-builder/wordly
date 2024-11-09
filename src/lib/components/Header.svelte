<script>
    import logo from '$lib/images/logo_no_slogan.svg';
    import ProfileIcon from "$lib/components/ProfileIcon.svelte";
</script>

<nav class="w-full flex justify-between p-2 bg-gray-950 z-10">
    <a href="/universes">
        <img src={logo} alt="Logo" class="h-11 ps-1"/>
    </a>
    <slot/>
    <div class="end">

        <ProfileIcon/>
    </div>
</nav>

<style>

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    nav .end {
        display: flex;
        align-items: center;
        padding-right: 10px;
    }

</style>
