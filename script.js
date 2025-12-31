const secs = document.querySelectorAll(".zsec");

function runZoom() {
    secs.forEach(sec => {
        const r = sec.getBoundingClientRect();
        const mid = window.innerHeight / 2;

        if (r.top < mid && r.bottom > mid) {
            sec.classList.add("zin");
            sec.classList.remove("zout");
        } else {
            sec.classList.remove("zin");
            sec.classList.add("zout");
        }
    });
}

window.addEventListener("scroll", runZoom);
window.addEventListener("load", runZoom);

const btn = document.getElementById("btnNav");
const nav = document.getElementById("nav");
const main = document.getElementById("main");

btn.addEventListener("click", () => {
    nav.classList.toggle("nav-small");
    main.classList.toggle("main-big");

    if (nav.classList.contains("nav-small")) {
        btn.className = "fa-solid fa-arrow-right fs-5";
    } else {
        btn.className = "fa-solid fa-arrow-left fs-5";
    }
});
