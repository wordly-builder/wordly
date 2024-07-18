<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import MoreVertIcon from "virtual:icons/mdi/more-vert";
    import anime from "animejs";
    import {onMount} from "svelte";
    import {randomColorList} from "$lib/data/random.color.list";

    onMount(() => {

        const universesButtons = document.querySelectorAll(".project-button");
        const universesButtonsArray = Array.from(universesButtons);
        for (let i = 0; i < universesButtonsArray.length; i++) {
            universesButtonsArray[i].addEventListener("mouseenter", () => {
                anime({
                    targets: universesButtonsArray[i],
                    scale: 1.02,
                    duration: 200,
                });
                anime({
                    targets: universesButtonsArray[i].firstChild,
                    backgroundColor: randomColorList[Math.floor(Math.random() * randomColorList.length)],
                    duration: 200,
                });
            });
            universesButtonsArray[i].addEventListener("mouseleave", () => {
                anime({
                    targets: universesButtonsArray[i],
                    scale: 1,
                    duration: 200,
                });
                anime({
                    targets: universesButtonsArray[i].firstChild,
                    backgroundColor: i % 2 === 0 ? "#afafaf" : "#e0e0e0",
                    duration: 200,
                });
            });
        }
    });

    export let data;
    const universes = data.universes;
    console.log(data);
    let selectedUniverse: any = null;

    function openOptions(universe: any) {
        return function _openOptions(event: any) {
            event.stopPropagation();
            const options = document.getElementById("options");
            if (!options) {
                return;
            }
            if (options.style.display === "block") {
                options.style.display = "none";
                selectedUniverse = null;
            } else {
                options.style.display = "block";
                // update position
                const rect = event.target.getBoundingClientRect();
                options.style.top = rect.bottom + "px";
                options.style.left = rect.left + "px";

                // if position is outside of the window, move it inside
                if (options.getBoundingClientRect().right > window.innerWidth) {
                    options.style.left = (window.innerWidth - options.getBoundingClientRect().width) + "px";
                }

                // close options when clicking outside
                window.addEventListener("click", (e: any) => {
                    if (!options.contains(e.target)) {
                        options.style.display = "none";
                        selectedUniverse = null;
                    }
                });

                // set selected universe
                selectedUniverse = universe
            }

        }
    }


    function deleteUniverse() {
        const options = document.getElementById("options");
        if (options) {
            options.style.display = "none";
        }

        if (selectedUniverse) {
            fetch(`/api/universes?id=${selectedUniverse.id}`, {
                method: "DELETE",
            }).then(() => {
                window.location.reload();
            });
        }
    }
</script>


<Header />
<div class="page">
    {#if universes && universes.length > 0}
        <h1>Universes</h1>
        <div class="projects-container">
            <div class="project-desc">Name</div>
            {#each universes as universe, i}
                <button class="project-button pb-{i}" on:click={async (test) => {
                    const pButtons = document.querySelectorAll(".project-button");
                    const pButtonsArray = Array.from(pButtons).filter((button) => !button.classList.contains(`pb-${i}`));
                    const selectedButton = document.querySelector(`.pb-${i}`);
                    window.location.href = `universes/${universe.id}`;
                }}>
                    <div class={"project " + (i % 2 === 0 ? "even" : "odd")}>
                        {universe.name}
                        <button class="button" on:click={openOptions(universe)}>
                            <MoreVertIcon style="width: 20px; height: 20px;"/>
                        </button>
                    </div>
                </button>
            {/each}
        </div>
    {:else}
        <div class="no-project">
            <p>You don't seem to have an universe yet.<br/>
                Create a new one by clicking the button at the bottom right corner.</p>
        </div>
    {/if}

    <a class="floating-button" href="universes/create">Create Universe</a>
    <ul id="options" class="options">
        <li><button on:click={deleteUniverse}>Delete</button></li>
    </ul>
</div>

<style>
    h1 {
        text-align: left;
        padding: 0;
    }

    .page {
        display: flex;
        flex-direction: column;
        margin: 0 30px;
    }

    .no-project {
        position: absolute;
        display: flex;
        top: 50%;
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    .floating-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #3d3d3d;
        color: white;
        border: none;
        cursor: pointer;
    }

    .projects-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
    }

    .project {
        padding: 20px;
        border-radius: 5px;
        color: black;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .project-button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        width: 100%;
        align-items: start;
        padding: 0;
    }

    .project-desc {
        font-weight: bold;
        padding: 20px;
    }

    .button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        width: 30px;
        height: 30px;
    }

    .button:hover {
        background-color: #f0f0f0;
    }

    a:hover {
        text-decoration: none;
    }

    .even {
        background-color: #afafaf;
    }

    .odd {
        background-color: #e0e0e0;
    }

    .options {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        padding: 0;
        margin: 0;
        z-index: 1;
    }

    .options li {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .options button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 10px;
        width: 100%;
        text-align: left;
    }

    .options button:hover {
        background-color: #ffffff;
    }
</style>
