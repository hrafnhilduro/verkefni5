/**
 * "Gervi" API sem skilar statískum gögnum fyrir fyrirlestra. Gætum hæglega
 * tengt hérna við "alvöru" API.
 * Sameinar statísk gögn við gögn geymd í localStorage.
 */
import data from './lectures.json';

// Lykill sem við geymum vistaðar færslur undir.
const LOCALSTORAGE_KEY = 'saved_lectures';

/**
 * Sækir alla vistaða fyrirlestra í localStorage.
 * @returns {array} Fylki af slug fyrir vistaða fyrirlestra.
 */
export function loadSavedLectures() {
  const savedJson = localStorage.getItem(LOCALSTORAGE_KEY);
  const saved = JSON.parse(savedJson) || [];

  return saved;
}

/**
 * Skilar lista af fyrirlestrum, síuuðum eftir flokkum eða ekki. Gögn um það
 * hvort notandi hafi klárað fyrirlestrar er bætt við gögn.
 *
 * @param {array} filters Fylki af flokkum sem fyrirlestrar mega vera í.
 *                        Sjálfgefið [].
 * @returns {array} Fylki af fyrirlestrum.
 */
export function getLectureList(filters = []) {
  const { lectures } = data;

  const lecturesList = lectures.filter(item => filters.length === 0 || filters.indexOf(item.category) >= 0)

  const saved = loadSavedLectures();
  lecturesList.map((lecture) =>
    (saved.indexOf(lecture.slug) >= 0 )?
      lecture.finished = true : lecture.finished = false
  )

  return lectures.filter(item => filters.length === 0 || filters.indexOf(item.category) >= 0);
}

/**
 * Sækir ákveðinn fyrirlestur eftir slug. Bætir við upplýsingum um hvort
 * fyrirlestur sé kláraður ekki.
 *
 * @param {string} slug Slug á fyrirlestri sem sækja á.
 * @returns {object} Fyrirlestri sem fannst eða null ef engin fannst.
 */
export function getLecture(slug) {
  const { lectures } = data;
  const rightLecture = lectures.find(item => slug === item.slug);

  const saved = loadSavedLectures();
  if(rightLecture){
    if( saved.indexOf(slug) >= 0 ) {
      rightLecture.finished = true;
    } else {
      rightLecture.finished = false;
    }
    return rightLecture
  } else {
    return null;
  }
}

/**
 * Setur fyrirlestur sem kláraðann eða ekki eftir slug. Ef fyrirlestur var
 * kláraðar er hann settur sem ókláraður og öfugt.
 *
 * @param {string} slug Slug á fyrirlestri sem klára á.
 */
export function toggleLectureFinish(slug) {
  const saved = loadSavedLectures();

  const index = saved.indexOf(slug);

  if (index >= 0) {
    saved.splice(index, 1);
  } else {
    saved.push(slug);
  }

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}
