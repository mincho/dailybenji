// Carry any email handed off from a home-page form through to signup.
const params = new URLSearchParams(window.location.search);
const email = params.get("email");
const link = document.getElementById("signup-link");
if (email && link) {
    const url = new URL(link.href);
    url.searchParams.set("email", email);
    link.href = url.toString();
}
