import localforage from "localforage";
//import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import { getPerson } from "./people";
import { getOrganisation } from "./organisations";
import { getSite } from "./sites";
import { getEquipment } from "./equipments";

export async function getRelationList() {
    let relations = await localforage.getItem("relations");
    if (!relations) {
      relations = [];
    }
    return relations;
  }

export async function getDirectRelationList( worldId, entityId ) {
  let relations = await localforage.getItem("relations");
  if (!relations) {
    relations = [];
  } else if (worldId) {
    relations = relations.filter( relation => relation.worldId === worldId )
    if (entityId) {
        relations = relations.filter( relation => relation.source === entityId )
        for (let i=0; i<relations.length; i++) {
            let target
            if ( relations[i].category === "personToPerson") {
                target = await getPerson(relations[i].target)
            } else if ( relations[i].category === "personToOrganisation") {
                target = await getOrganisation(relations[i].target)
            } else if ( relations[i].category === "personToSite") {
                target = await getSite(relations[i].target)
            } else if ( relations[i].category === "personToEquipment") {
                target = await getEquipment(relations[i].target)
            }
            if (target) {
                relations[i].targetName = target.name
            }
        }        
    }
  }
  return relations.sort(sortBy("category"));
}

export async function getReciprocalRelationList( worldId, entityId ) {
    let relations = await localforage.getItem("relations");
    if (!relations) {
      relations = [];
    } else if (worldId) {
      relations = relations.filter( relation => relation.worldId === worldId )
      if (entityId) {
        relations = relations.filter( relation => relation.target === entityId )
          for (let i=0; i<relations.length; i++) {
              const source = await getPerson(relations[i].source)
              if (source) {
                relations[i].sourceName = source.name
              }
          }
      }
    }
    return relations.sort(sortBy("category"));
  }

export async function createRelation(worldId, category, sourceId, targetId) {
  let id = Math.random().toString(36).substring(2, 9);
  let relation = { id, worldId, category, source: sourceId, target: targetId, createdAt: Date.now() };
  let relations = await getRelationList();
  relations.unshift(relation);
  await set(relations);
  return relation;
}

/*
export async function importOrganisation(organisation) {
  let organisations = await getOrganisationList();
  //Check if the organisation exists
  let index = organisations.findIndex(myOrganisation => organisation.id === myOrganisation.id);
    if (index > -1) {
      console.log("Cette organisation existe déjà")
      return false
    } else {
      organisations.unshift(organisation);
    }
  await set(organisations);
  return organisation;
}
*/

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

function set(relations) {
  return localforage.setItem("relations", relations);
}
