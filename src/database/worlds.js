import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getWorlds(query) {
  await fakeNetwork(`getWorlds:${query}`);
  let worlds = await localforage.getItem("worlds");
  if (!worlds) worlds = [];
  if (query) {
    worlds = matchSorter(worlds, query, { keys: ["name", "description"] });
  }
  return worlds.sort(sortBy("createdAt"));
}

export async function createWorld() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let world = {
    id,
    theater: {
      outline: "",
    },
    context: {},
    keywords: [],
    createdAt: Date.now()
  };
  let worlds = await getWorlds();
  worlds.unshift(world);
  await set(worlds);
  return world;
}

export async function importWorld(world) {
  let worlds = await getWorlds();
  //Check if the story exists
    let index = worlds.findIndex(myWorld => world.id === myWorld.id);
    if (index > -1) {
      console.log("Ce monde existe déjà")
      return false
    } else {
      worlds.unshift(world);
    }
  await set(worlds);
  return world;
}

export async function getWorld(id) {
  await fakeNetwork(`world:${id}`);
  let worlds = await localforage.getItem("worlds");
  let world = worlds.find(world => world.id === id);
  return world ?? null;
}

export async function updateWorld(id, updates) {
  await fakeNetwork();
  let worlds = await localforage.getItem("worlds");
  let world = worlds.find(world => world.id === id);
  if (!world) throw new Error("No world found for", id);
  Object.assign(world, updates);
  await set(worlds);
  return world;
}

export async function deleteWorld(id) {
  let worlds = await localforage.getItem("worlds");
  let index = worlds.findIndex(world => world.id === id);
  if (index > -1) {
    worlds.splice(index, 1);
    await set(worlds);
    return true;
  }
  return false;
}

function set(worlds) {
  return localforage.setItem("worlds", worlds);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 80);
  });
}