import {getWorks, getCategories, display, useSet} from "./functions.js";
const jsonWorks = await getWorks();
const works = useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);

display(works);