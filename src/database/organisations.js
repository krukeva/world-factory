import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getOrganisationList( worldId, query ) {
  let organisations = await localforage.getItem("organisations");
  if (!organisations) {
    organisations = [];
  } else if (worldId) {
    organisations = organisations.filter( organisation => organisation.worldId === worldId )
  }
  if (query) {
    organisations = matchSorter(organisations, query, { keys: ["name"] });
  }
  return organisations.sort(sortBy("name"));
}

export async function createOrganisation(worldId) {
  let id = Math.random().toString(36).substring(2, 9);
  let organisation = { id, worldId, createdAt: Date.now() };
  let organisations = await getOrganisationList();
  organisations.unshift(organisation);
  await set(organisations);
  return organisation;
}

export async function importOrganisationList(list) {
  let organisations = await getOrganisationList();
  if(Array.isArray(list)){
    for(let i=0; i<list.length; i++){
      //Check if the person exists
      let index = organisations.findIndex(myOrganisation => list[i].id === myOrganisation.id);
      if (index > -1) {
        console.log("Cette organisation existe déjà")
      } else {
        organisations.unshift(list[i])
      }
    }
  }
  await set(organisations);
  return true
}

export async function getOrganisation(id) {
  let organisations = await getOrganisationList();
  if (!organisations) return null;
  let organisation = organisations.find(organisation => organisation.id === id);
  return organisation ?? null;
}

export async function updateOrganisation(id, updates) {
  let organisations = await getOrganisationList();
  let organisation = organisations.find(organisation => organisation.id === id);
  if (!organisation) throw new Error("No world organisation found for", id);
  Object.assign(organisation, updates);
  await set(organisations);
  return organisation;
}

export async function deleteOrganisation(id) {
  let organisations = await getOrganisationList();
  let index = organisations.findIndex(organisation => organisation.id === id);
  if (index > -1) {
    organisations.splice(index, 1);
    await set(organisations);
    return true;
  }
  return false;
}

export async function deleteOrganisationList(worldId) {
  let organisations = await getOrganisationList();
  organisations = organisations.filter((item=>item.worldId !== worldId))
  await set(organisations);
  return true;
}

function set(organisations) {
  return localforage.setItem("organisations", organisations);
}
