<script>

    import {browser} from "$app/environment";

    if (browser) {
        const session = event.locals.auth();

        console.log(session);
    }

</script>

<div>
    <h1>Universes page</h1>
</div>
