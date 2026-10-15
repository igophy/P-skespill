#!/usr/bin/env node
// Kjør: node validate-content.mjs [game-data.js] [mappe-med-svg-filer]
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const arguments_ = process.argv.slice(2);
const usage = 'Bruk: node validate-content.mjs [game-data.js] [mappe-med-svg-filer]';
if (arguments_.includes('--help') || arguments_.includes('-h')) {
  console.log(`${usage}\nUten argumenter kontrolleres filene ved siden av dette skriptet.\nEn alternativ innholdsfil bruker samme assets-mappe, med mindre en annen oppgis.`);
  process.exit(0);
}
if (arguments_.length > 2) {
  console.error(usage);
  process.exit(1);
}
const dataFile = arguments_[0] ? resolve(arguments_[0]) : join(scriptDirectory, 'game-data.js');
const assetDirectory = arguments_[1] ? resolve(arguments_[1]) : join(scriptDirectory, 'assets');
let story;
try {
  const context = { window: {} };
  vm.runInNewContext(readFileSync(dataFile, 'utf8'), context, {
    filename: dataFile,
    timeout: 1000,
    contextCodeGeneration: { strings: false, wasm: false }
  });
  story = context.window.FJELLRO;
} catch (error) {
  console.error(`Kunne ikke lese innholdet i ${dataFile}:\n${error.message}`);
  process.exit(1);
}

const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const safeId = /^[a-z][a-z0-9-]*$/;
const iconNames = new Set([
  'arrow', 'back', 'close', 'check', 'search', 'home', 'chat', 'file',
  'gear', 'sound', 'mute', 'cup', 'receipt', 'photo', 'letter', 'door',
  'clock', 'link', 'lock', 'hint', 'send', 'trophy', 'snow', 'book',
  'money', 'heart', 'download'
]);
function object(value, path) {
  if (isObject(value)) return value;
  fail(path, 'må være et objekt.');
  return {};
}
function array(value, path, minimum = 0, length = null) {
  if (!Array.isArray(value)) {
    fail(path, 'må være en liste.');
    return [];
  }
  if (length !== null && value.length !== length) fail(path, `må inneholde nøyaktig ${length} elementer.`);
  else if (value.length < minimum) fail(path, `må inneholde minst ${minimum} element${minimum === 1 ? '' : 'er'}.`);
  for (let index = 0; index < value.length; index++) {
    if (!Object.hasOwn(value, index)) fail(`${path}[${index}]`, 'mangler et element. Fjern det ekstra kommaet eller fyll inn innholdet.');
  }
  return value;
}
function string(value, path) {
  if (typeof value === 'string' && value.trim()) return true;
  fail(path, 'må være en tekst som ikke er tom.');
  return false;
}
function strings(owner, fields, path) {
  for (const field of fields) string(owner[field], `${path}.${field}`);
}
function id(value, path) {
  if (typeof value === 'string' && safeId.test(value)) return true;
  fail(path, 'må begynne med en liten bokstav og bare inneholde a–z, 0–9 og bindestrek.');
  return false;
}
function icon(value, path) {
  if (!iconNames.has(value)) fail(path, `ukjent ikon ${JSON.stringify(value) ?? '(mangler)'}. Bruk et ikon fra app.js.`);
}
function asset(value, path) {
  if (!id(value, path)) return;
  const filename = join(assetDirectory, `${value}.svg`);
  try {
    if (!statSync(filename).isFile()) throw new Error('ikke en fil');
  } catch {
    fail(path, `fant ikke SVG-filen ${filename}. Oppgi filnavnet uten .svg.`);
  }
}
function references(value, valid, path) {
  if (typeof value !== 'string' || !valid.has(value)) fail(path, `viser til en ukjent ID ${JSON.stringify(value) ?? '(mangler)'}.`);
}
function referenceList(value, valid, path, minimum = 0) {
  const values = array(value, path, minimum);
  const seen = new Set();
  values.forEach((entry, index) => {
    references(entry, valid, `${path}[${index}]`);
    if (seen.has(entry)) fail(`${path}[${index}]`, `ID-en ${JSON.stringify(entry)} er oppført flere ganger.`);
    seen.add(entry);
  });
  return values;
}
function collection(value, path, minimum = 0, tuple = false) {
  const values = array(value, path, minimum);
  const ids = new Set();
  values.forEach((entry, index) => {
    const entryId = tuple ? (Array.isArray(entry) ? entry[0] : undefined) : (isObject(entry) ? entry.id : undefined);
    const idPath = `${path}[${index}]${tuple ? '[0]' : '.id'}`;
    if (id(entryId, idPath)) {
      if (ids.has(entryId)) fail(idPath, `ID-en «${entryId}» finnes allerede i ${path}.`);
      ids.add(entryId);
    }
  });
  return { values, ids };
}
function timelineEvent(value, path) {
  const event = array(value, path, 0, 3);
  event.forEach((part, index) => string(part, `${path}[${index}]`));
  if (typeof event[0] === 'string' && !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(event[0])) fail(`${path}[0]`, 'må være et klokkeslett i formatet TT:MM, fra 00:00 til 23:59.');
}

story = object(story, 'window.FJELLRO');
const meta = object(story.meta, 'meta');
id(meta.id, 'meta.id');
if (!Number.isSafeInteger(meta.revision) || meta.revision < 1) fail('meta.revision', 'må være et positivt heltall. Øk revisjonen når gamle funn blir ugyldige.');
strings(meta, ['title', 'brand', 'subtitle', 'timeLabel', 'sceneLabel', 'heroDescription', 'caseLabel', 'duration', 'heroAlt', 'victimName'], 'meta');
array(meta.heroLines, 'meta.heroLines', 1).forEach((line, index) => string(line, `meta.heroLines[${index}]`));
asset(meta.heroAsset, 'meta.heroAsset');

const clueCollection = collection(story.clues, 'clues', 1);
const personCollection = collection(story.people, 'people', 1);
const roomCollection = collection(story.rooms, 'rooms', 1);
const deductionCollection = collection(story.deductions, 'deductions');
const methodCollection = collection(story.methods, 'methods', 1, true);
const motiveCollection = collection(story.motives, 'motives', 1, true);
const clues = clueCollection.values;
const people = personCollection.values;
const rooms = roomCollection.values;
const deductions = deductionCollection.values;
references(meta.firstRoomId, roomCollection.ids, 'meta.firstRoomId');

clues.forEach((entry, index) => {
  const path = `clues[${index}]`, clue = object(entry, path);
  strings(clue, ['title', 'location', 'text', 'detail'], path);
  icon(clue.icon, `${path}.icon`);
});

const questionIds = new Set();
let questionCount = 0;
people.forEach((entry, index) => {
  const path = `people[${index}]`, person = object(entry, path);
  strings(person, ['name', 'role', 'intro'], path);
  asset(person.portrait, `${path}.portrait`);
  if (typeof person.suspect !== 'boolean') fail(`${path}.suspect`, 'må være true for en mistenkt eller false for et vitne.');
  array(person.qa, `${path}.qa`, 1).forEach((value, position) => {
    const qaPath = `${path}.qa[${position}]`;
    const pair = array(value, qaPath, 0, 2);
    string(pair[0], `${qaPath}[0]`);
    string(pair[1], `${qaPath}[1]`);
    const questionId = `${person.id}${position}`;
    if (questionIds.has(questionId)) fail(qaPath, `spørsmåls-ID-en «${questionId}» kolliderer med en annen persons spørsmål. Endre person-ID.`);
    questionIds.add(questionId);
    questionCount++;
  });
});
const suspects = people.filter(person => isObject(person) && person.suspect === true);
if (!suspects.length) fail('people', 'minst én person må ha suspect: true, slik at en gjerningsperson kan velges.');

const placements = new Map([...clueCollection.ids].map(clueId => [clueId, []]));
rooms.forEach((entry, index) => {
  const path = `rooms[${index}]`, room = object(entry, path);
  strings(room, ['name', 'description', 'sub'], path);
  asset(room.asset, `${path}.asset`);
  const roomClues = referenceList(room.clues, clueCollection.ids, `${path}.clues`);
  const spots = object(room.spots, `${path}.spots`);
  roomClues.forEach(clueId => {
    if (placements.has(clueId)) placements.get(clueId).push(room.id);
    const spotPath = `${path}.spots.${clueId}`;
    if (!Object.hasOwn(spots, clueId)) {
      fail(spotPath, 'mangler koordinater for et spor som er oppført i rommets clues.');
      return;
    }
    const coordinates = array(spots[clueId], spotPath, 0, 2);
    coordinates.forEach((coordinate, position) => {
      if (typeof coordinate !== 'number' || !Number.isFinite(coordinate) || coordinate < 0 || coordinate > 100) fail(`${spotPath}[${position}]`, 'må være et tall mellom 0 og 100 prosent.');
    });
  });
  Object.keys(spots).forEach(clueId => {
    if (!roomClues.includes(clueId)) fail(`${path}.spots.${clueId}`, 'har koordinater, men sporet er ikke oppført i rommets clues.');
  });
});
for (const [clueId, locations] of placements) {
  if (locations.length !== 1) fail(`clues.${clueId}`, `må plasseres i nøyaktig ett rom; fant ${locations.length}${locations.length ? ` (${locations.join(', ')})` : ''}.`);
}

const deductionPairs = new Set();
deductions.forEach((entry, index) => {
  const path = `deductions[${index}]`, deduction = object(entry, path);
  strings(deduction, ['title', 'text'], path);
  const pair = referenceList(deduction.pair, clueCollection.ids, `${path}.pair`);
  if (pair.length !== 2) fail(`${path}.pair`, 'må vise til nøyaktig to forskjellige spor.');
  if (pair.length === 2 && pair.every(value => typeof value === 'string')) {
    const key = [...pair].sort().join('|');
    if (deductionPairs.has(key)) fail(`${path}.pair`, 'samme sporpar brukes allerede i en annen forbindelse; begge forbindelsene kan da ikke oppdages.');
    deductionPairs.add(key);
  }
});

for (const [name, choices] of [['methods', methodCollection.values], ['motives', motiveCollection.values]]) {
  choices.forEach((entry, index) => {
    const path = `${name}[${index}]`, choice = array(entry, path, 0, 4);
    string(choice[1], `${path}[1]`);
    string(choice[2], `${path}[2]`);
    icon(choice[3], `${path}[3]`);
  });
}
const solution = object(story.solution, 'solution');
references(solution.personId, personCollection.ids, 'solution.personId');
if (personCollection.ids.has(solution.personId) && !suspects.some(person => person.id === solution.personId)) fail('solution.personId', 'gjerningspersonen må ha suspect: true.');
references(solution.methodId, methodCollection.ids, 'solution.methodId');
references(solution.motiveId, motiveCollection.ids, 'solution.motiveId');

if (story.confrontation != null) {
  const confrontation = object(story.confrontation, 'confrontation');
  references(confrontation.personId, personCollection.ids, 'confrontation.personId');
  referenceList(confrontation.requiresClues, clueCollection.ids, 'confrontation.requiresClues');
  referenceList(confrontation.requiresQuestions, questionIds, 'confrontation.requiresQuestions');
  strings(confrontation, ['question', 'answer'], 'confrontation');
}
array(story.hints, 'hints', 1).forEach((hint, index) => string(hint, `hints[${index}]`));
const timeline = object(story.timeline, 'timeline');
array(timeline.base, 'timeline.base').forEach((event, index) => timelineEvent(event, `timeline.base[${index}]`));
array(timeline.discoveries, 'timeline.discoveries').forEach((entry, index) => {
  const path = `timeline.discoveries[${index}]`, discovery = object(entry, path);
  references(discovery.clueId, clueCollection.ids, `${path}.clueId`);
  timelineEvent(discovery.event, `${path}.event`);
});
array(story.intro, 'intro', 1).forEach((entry, index) => {
  const path = `intro[${index}]`, part = object(entry, path);
  strings(part, ['title', 'text', 'label'], path);
  if (part.portrait != null) asset(part.portrait, `${path}.portrait`);
});
array(story.verdictSteps, 'verdictSteps', 0, 4).forEach((entry, index) => {
  array(entry, `verdictSteps[${index}]`, 0, 3).forEach((value, position) => string(value, `verdictSteps[${index}][${position}]`));
});
string(story.verdictFeedback, 'verdictFeedback');
const ending = object(story.ending, 'ending');
strings(ending, ['title', 'subtitle', 'epilogue'], 'ending');
array(ending.paragraphs, 'ending.paragraphs', 1).forEach((paragraph, index) => string(paragraph, `ending.paragraphs[${index}]`));

if (errors.length) {
  console.error(`Innholdskontrollen fant ${errors.length} feil i ${dataFile}:`);
  errors.forEach(error => console.error(`- ${error}`));
  console.error('\nRett feilene og kjør kontrollen på nytt. Historielogikken må også kontrolleres ved gjennomspilling.');
  process.exitCode = 1;
} else {
  console.log(`Godkjent: ${meta.id}, revisjon ${meta.revision} — ${clues.length} spor, ${rooms.length} rom, ${people.length} personer (${suspects.length} mistenkte), ${questionCount} spørsmål og ${deductions.length} forbindelser.`);
  console.log('Referanser, innholdsstruktur og lokale SVG-filer er kontrollert. Historielogikken må kontrolleres ved gjennomspilling.');
}
