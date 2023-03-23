import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPeople( worldId, query ) {
  let people = await localforage.getItem("people");
  if (!people) {
    people = [];
  } else if (worldId) {
    people = people.filter( person => person.worldId === worldId )
  }
  if (query) {
    people = matchSorter(people, query, { keys: ["name"] });
  }
  return people.sort(sortBy("name"));
}

export async function createPerson( worldId ) {
  let id = Math.random().toString(36).substring(2, 9);
  let person = { id, worldId, createdAt: Date.now() };
  let people = await getPeople();
  people.unshift(person);
  await set(people);
  return person;
}

export async function importPeople(list) {
  let people = await getPeople();
  if(Array.isArray(list)){
    for(let i=0; i<list.length; i++){
      //Check if the person exists
      let index = people.findIndex(myPerson => list[i].id === myPerson.id);
      if (index > -1) {
        console.log("Cette personne existe déjà")
      } else {
        people.unshift(list[i]);
      }
    }
  }
  await set(people);
  return true
}


export async function getPerson(id) {
  let people = await getPeople();
  if (!people) return null;
  let person = people.find(person => person.id === id);
  return person ?? null;
}

export async function updatePerson(id, updates) {
  let people = await getPeople();
  let person = people.find(person => person.id === id);
  if (!person) throw new Error("No person found for", id);
  Object.assign(person, updates);
  await set(people);
  return person;
}

export async function deletePerson(id) {
  let people = await getPeople();
  let index = people.findIndex(person => person.id === id);
  if (index > -1) {
    people.splice(index, 1);
    await set(people);
    return true;
  }
  return false;
}

export async function deletePeople(worldId) {
  let people = await getPeople();
  people = people.filter((item=>item.worldId !== worldId))
  await set(people);
  return true;
}

function set(people) {
  return localforage.setItem("people", people);
}