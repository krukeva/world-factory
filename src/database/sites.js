import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getSiteList( worldId, query ) {
  let sites = await localforage.getItem("sites");
  if (!sites) {
    sites = [];
  } else if (worldId) {
    sites = sites.filter( site => site.worldId === worldId )
  }
  if (query) {
    sites = matchSorter(sites, query, { keys: ["name"] });
  }
  return sites.sort(sortBy("name"));
}

export async function createSite(worldId) {
  let id = Math.random().toString(36).substring(2, 9);
  let site = { id, worldId, createdAt: Date.now() };
  let sites = await getSiteList();
  sites.unshift(site);
  await set(sites);
  return site;
}

export async function importSiteList(list) {
  let sites = await getSiteList();
  if(Array.isArray(list)){
    for(let i=0; i<list.length; i++){
      //Check if the person exists
      let index = sites.findIndex(mySite => list[i].id === mySite.id)
      if (index > -1) {
        console.log("Ce site existe déjà")
      } else {
        sites.unshift(list[i])
      }
    }
  }
  await set(sites)
  return true
}

export async function getSite(id) {
  let sites = await getSiteList();
  if (!sites) return null;
  let site = sites.find(site => site.id === id);
  return site ?? null;
}

export async function updateSite(id, updates) {
  let sites = await getSiteList();
  let site = sites.find(site => site.id === id);
  if (!site) throw new Error("No world site found for", id);
  Object.assign(site, updates);
  await set(sites);
  return site;
}

export async function deleteSite(id) {
  let sites = await getSiteList();
  let index = sites.findIndex(site => site.id === id);
  if (index > -1) {
    sites.splice(index, 1);
    await set(sites);
    return true;
  }
  return false;
}

export async function deleteSiteList(worldId) {
  let sites = await getSiteList();
  sites = sites.filter((item=>item.worldId !== worldId))
  await set(sites);
  return true;
}

function set(sites) {
  return localforage.setItem("sites", sites);
}
