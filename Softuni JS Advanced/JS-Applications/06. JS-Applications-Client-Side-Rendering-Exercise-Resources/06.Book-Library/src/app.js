import { render } from './utility.js'
import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showEdit } from './edit.js';


const body = document.body;

const ctx = {
    update
};

update();
function update(){
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showEdit(ctx),
    ], body);
}