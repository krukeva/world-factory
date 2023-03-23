import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getEquipmentList( worldId, query ) {
  let equipments = await localforage.getItem("equipments");
  if (!equipments) {
    equipments = [];
  } else if (worldId) {
    equipments = equipments.filter( equipment => equipment.worldId === worldId )
  }
  if (query) {
    equipments = matchSorter(equipments, query, { keys: ["name"] });
  }
  return equipments.sort(sortBy("name"));
}

export async function createEquipment(worldId) {
  let id = Math.random().toString(36).substring(2, 9);
  let equipment = { id, worldId, createdAt: Date.now() };
  let equipments = await getEquipmentList();
  equipments.unshift(equipment);
  await set(equipments);
  return equipment;
}

export async function importEquipmentList(list) {
  let equipments = await getEquipmentList();
  if(Array.isArray(list)){
    for(let i=0; i<list.length; i++){
      //Check if the equipment exists
      let index = equipments.findIndex(myEquipment => list[i].id === myEquipment.id);
      if (index > -1) {
        console.log("Cet équipement existe déjà")
      } else {
        equipments.unshift(list[i]);
    }
    await set(equipments);
    }
  }
  return true;
}

export async function getEquipment(id) {
  let equipments = await getEquipmentList();
  if (!equipments) return null;
  let equipment = equipments.find(equipment => equipment.id === id);
  return equipment ?? null;
}

export async function updateEquipment(id, updates) {
  let equipments = await getEquipmentList();
  let equipment = equipments.find(equipment => equipment.id === id);
  if (!equipment) throw new Error("No world equipment found for", id);
  Object.assign(equipment, updates);
  await set(equipments);
  return equipment;
}

export async function deleteEquipment(id) {
  let equipments = await getEquipmentList();
  let index = equipments.findIndex(equipment => equipment.id === id);
  if (index > -1) {
    equipments.splice(index, 1);
    await set(equipments);
    return true;
  }
  return false;
}

export async function deleteEquipmentList(worldId) {
  let equipments = await getEquipmentList();
  equipments = equipments.filter((item=>item.worldId !== worldId))
  await set(equipments);
  return true;
}

function set(equipments) {
  return localforage.setItem("equipments", equipments);
}
