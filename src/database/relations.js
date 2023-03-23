import localforage from "localforage";
//import { matchSorter } from "match-sorter";
//import sortBy from "sort-by";

export async function getRelationList( worldId ) {
    let relations = await localforage.getItem("relations");
    if (!relations) {
      relations = [];
    } else if (worldId) {
      relations = relations.filter( relation => relation.worldId === worldId )
    }
    return relations;
  }

export async function createRelation(worldId, category, sourceId, targetId) {
  let id = Math.random().toString(36).substring(2, 9);
  let relation = { id, worldId, category, source: sourceId, target: targetId, createdAt: Date.now() };
  let relations = await getRelationList();
  relations.unshift(relation);
  await set(relations);
  return relation;
}

export async function importRelationList(list) {
  let relations = await getRelationList()
  if(Array.isArray(list)){
    for(let i=0; i<list.length; i++){
  //Check if the relation exists
  let index = relations.findIndex(myRelation => list[i].id === myRelation.id);
      if (index > -1) {
        console.log("Cette relation existe déjà")
      } else {
        relations.unshift(list[i]);
      }
    }
  }
  await set(relations)
  return true
}


export async function getRelation(id) {
  let relations = await getRelationList();
  if (!relations) return null;
  let relation = relations.find(relation => relation.id === id);
  return relation ?? null;
}

export async function updateRelation(id, updates) {
    let relations = await getRelationList();
    let relation = relations.find(relation => relation.id === id);
  if (!relation) throw new Error("No world relation found for", id);
  Object.assign(relation, updates);
  await set(relations);
  return relation;
}

export async function deleteRelation(id) {
  let relations = await getRelationList();
  let index = relations.findIndex(relation => relation.id === id);
  if (index > -1) {
    relations.splice(index, 1);
    await set(relations);
    return true;
  }
  return false;
}

export async function deleteRelationList(worldId) {
  let relations = await getRelationList();
  relations = relations.filter((relation=>relation.worldId !== worldId))
  await set(relations);
  return true;
}

function set(relations) {
  return localforage.setItem("relations", relations);
}
