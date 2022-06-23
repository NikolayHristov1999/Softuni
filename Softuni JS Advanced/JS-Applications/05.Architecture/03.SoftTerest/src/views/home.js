
const section = document.getElementById('homePage');

section.remove();
section.querySelector('#getStartedLink').addEventListener('click', (e) => {
    e.preventDefault();
    context.goTo('catalog');
});
let context = null;

export async function showHomePage(ctx){
    context = ctx;
    ctx.showSection(section);
}