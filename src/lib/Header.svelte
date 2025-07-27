<header class="bg-elevation-2 text-black dark:bg-dark-elevation-2 dark:text-white p-2">
    <a href="/" onclick={() => location.href = "/"} aria-label="Home">
        <div class="logo bg-no-repeat bg-center bg-contain h-10 w-24"></div>
    </a>
</header>

<style>
    .logo {
        background-image: url('/logo_full_black.svg');
    }

    @media (prefers-color-scheme: dark) {
        .logo {
            background-image: url('/logo_full_white.svg');
        }
    }
</style>