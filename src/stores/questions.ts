// todo: Turn this to an actual DB, including the ability to upload new questions,
// and to edit existing questions. For now, this is just a static list of questions.
interface Question {
  category: number
  id: number
  text: string
  correctAnswer: string
  answers: string[]
  additionalInfo?: string
}

const questions: Question[] = [
  {
    category: 8,
    id: 1,
    text: 'Which Irish saint is the patron of mariners, divers, whales, and the US Navy?',
    correctAnswer: 'St Brendan the Navigator',
    answers: ['St Catherine of Alexandria', 'St Matthew', 'St Brendan the Navigator', 'St Patrick'],
    additionalInfo:
      'Brendan of Clonfert (c. AD 484-c. 577) is one of the early Irish monastic saints and one of the Twelve Apostles of Ireland.',
  },
  {
    category: 8,
    id: 2,
    text: 'Which saint is the patron of more or less all travelers? Medallions and statues of him are commonly carried by Catholic travelers, including in their cars.',
    correctAnswer: 'St Christopher',
    answers: [
      'St Catherine of Alexandria',
      'St Christopher',
      'St Joseph of Cupertino',
      'St Sebastian',
    ],
  },
  {
    category: 8,
    id: 3,
    text: 'Who is the patron saint of Boy Scouts and England, among many other things?',
    correctAnswer: 'St George (of Lydda)',
    answers: [
      'St George (of Lydda)',
      'St Ignatius of Loyola',
      'St Sebastian',
      'St James the Greater',
    ],
  },
  {
    category: 8,
    id: 4,
    text: 'Which Italian saint is the patron of air travellers and astronauts, due to his alleged ability to fly? He is also the patron of exam takers, due to his miraculously getting asked only the questions he knew at his ordination as a priest.',
    correctAnswer: 'St Joseph of Cupertino',
    answers: [
      'St Anthony of Padua',
      'St Joseph of Cupertino',
      'St Francis of Assisi',
      'St Peter the Apostle',
    ],
  },
  {
    category: 8,
    id: 5,
    text: 'Which saint is the patron of archers, due to his martyrdom including being tied to a tree or post and shot with arrows?',
    correctAnswer: 'St Sebastian',
    answers: [
      'St Catherine of Alexandria',
      'St Christopher',
      'St Sebastian',
      'St Anthony the Abbot',
    ],
  },
  {
    category: 8,
    id: 6,
    text: 'What saint, who was archdeacon and ran hostels in the Alps, is the patron of mountaineers, the Alps, and presumably also the dogs named after him?',
    correctAnswer: 'St Bernard (of Menthon)',
    answers: ['St Lawrence', 'St Cosmas', 'St Bernard (of Menthon)', 'St Christopher'],
  },
  {
    category: 8,
    id: 7,
    text: 'Which saint is patron of toymakers and children? He is also a patron of sailors and travellers, due to his miraculously causing a storm to stop.',
    correctAnswer: 'St Nicholas (of Myra)',
    answers: ['St Joseph of Arimathea', 'St Matthew', 'St Nicholas (of Myra)', 'St Barbara'],
  },
  {
    category: 8,
    id: 8,
    text: `Which Roman saint, who was martyred on a gridiron, is reported to have said "I'm well done on this side. Turn me over!" for which he is considered the patron of cooks and comedians?`,
    correctAnswer: 'St Lawrence',
    answers: ['St Luke the Evangelist', 'St Pantaleon', 'St Lawrence', 'St Sebastian'],
  },
  {
    category: 8,
    id: 9,
    text: `Which saint is the patron of wheelwrights, because she was sentenced to be executed on a breaking wheel but it shattered at her touch? A type of firework is named after her.`,
    correctAnswer: 'St Catherine of Alexandria',
    answers: [
      'St Adrian of Nicomedia',
      'St Barbara',
      'St Catherine of Alexandria',
      'St Joan of Arc',
    ],
  },
  {
    category: 8,
    id: 10,
    text: `What saint is the patron of Italy, animals and animal rights activists, and the holy orders he founded?`,
    correctAnswer: 'St Francis of Assisi',
    answers: [
      'St Anthony of Padua',
      'St Nicholas of Myra',
      'St Gianna Beretta Molla',
      'St Francis of Assisi',
    ],
  },
  {
    category: 8,
    id: 11,
    text: `Which of the Apostles and author of one of the Gospels is patron of bankers, bookkeepers, and tax collectors, due to his having been a tax collector?`,
    correctAnswer: 'St Matthew',
    answers: [
      'St Luke the Evangelist',
      'St John the Apostle',
      'St Mark the Evangelist',
      'St Matthew',
    ],
  },
  {
    category: 8,
    id: 12,
    text: `Who is the patron saint of Seattle? A cathedral with his name is in First Hill He is also the patron of Spain, and according to legend his remains are buried in Santiago de Compostela.`,
    correctAnswer: 'St James (the Greater)',
    answers: [
      'St Jean-Baptiste de La Salle',
      'St James (the Greater)',
      'St Peter',
      'St John the Apostle',
    ],
  },
  {
    category: 8,
    id: 14,
    text: `What French saint, who dedicated his life to educating the poor, is the patron of educators? He founded an order dedicated to education, and has many schools named after him, including a university in Philadelphia, PA.`,
    correctAnswer: 'St Jean-Baptiste de La Salle',
    answers: [
      'St Ignatius of Loyola',
      'St Jean-Baptiste de La Salle',
      'St Thomas Aquinas',
      'St Peter',
    ],
  },
  {
    category: 8,
    id: 15,
    text: `Which Basque saint, who cofounded and was the first head of the Jesuits, is venerated as the patron saint of soldiers?`,
    correctAnswer: 'St Ignatius of Loyola',
    answers: ['St Christopher', 'St Patrick', 'St Ignatius of Loyola', 'St George'],
  },
  {
    category: 8,
    id: 16,
    text: `Which of the Apostles, the first Bishop of Rome, is the patron saint of Popes, among a lot of other things?`,
    correctAnswer: 'St Peter',
    answers: ['St Peter', 'St Paul', 'St John the Apostle', 'St James'],
  },
  {
    category: 8,
    id: 17,
    text: `Which saint is the patron of lost causes, lost items, and lost people?`,
    correctAnswer: 'St Anthony of Padua',
    answers: ['St Francis of Assisi', 'St Peter', 'St Anthony of Padua', 'St Thomas Aquinas'],
  },
  {
    category: 8,
    id: 18,
    text: `Who is the patron saint of hopeless causes, but not a 1968 single by the Beatles?`,
    correctAnswer: 'St Jude the Apostle',
    answers: ['St Paul', 'St John the Apostle', 'St Jude the Apostle', 'St Peter'],
  },
  {
    category: 8,
    id: 19,
    text: `Which English saint, and author of Utopia, is the patron of statesmen and politicians?`,
    correctAnswer: 'St Thomas More',
    answers: ['St Augustine of Hippo', 'St Thomas More', 'St Thomas Aquinas', 'St Paul'],
  },
  {
    category: 8,
    id: 20,
    text: `What man who took Jesus’s body to be buried is venerated as the patron of funeral directors and undertakers?`,
    correctAnswer: 'St Joseph of Arimathea',
    answers: ['St Catherine of Alexandria', 'St Matthew', 'St Joseph of Arimathea', 'St Peter'],
  },
  {
    category: 8,
    id: 21,
    text: `Which early Christian philosopher and theologian is the patron saint of philosophers and theologians, as well as the city in Florida named after him?`,
    correctAnswer: 'St Augustine of Hippo',
    answers: ['St Thomas Aquinas', 'St Peter', 'St Paul', 'St Augustine of Hippo'],
  },
  {
    category: 9,
    id: 22,
    text: `An infection of Candida yeast, particularly in the mouth, is referred to by what bird name?`,
    correctAnswer: 'Thrush',
    answers: ['Robin', 'Thrush', 'Sparrow', 'Finch'],
  },
  {
    category: 9,
    id: 23,
    text: `What disease, AKA lockjaw, is not actually spread by rusty nails, but by soil bacteria? It is estimated to have killed 50,000 people in 2021.`,
    correctAnswer: 'Tetanus',
    answers: ['Anthrax', 'Diphtheria', 'Tetanus', 'Botulism'],
  },
  {
    category: 9,
    id: 24,
    text: `What mosquito-borne disease, also known historically as “The American Plague”, gets its name from the jaundice that precedes its most severe symptoms? It is currently estimated to kill 30,000 people per year.`,
    correctAnswer: 'Yellow fever',
    answers: ['West Nile virus', 'Green fever', 'Yellow fever', 'Dengue fever'],
  },
  {
    category: 9,
    id: 25,
    text: `Which virus, AKA “winter vomiting disease”, is the most common form of gastroenteritis, with 685 million cases globally and around 200,000 deaths according to the CDC?`,
    correctAnswer: 'Norovirus.',
    answers: ['Rotavirus', 'Norovirus.', 'Adenovirus', 'Astrovirus'],
  },
  {
    category: 9,
    id: 26,
    text: `Pertussis is also known by what name, due to the severity of the coughing fits it causes? It kills around 58,700 people per year.`,
    correctAnswer: 'Whooping cough',
    answers: ['Hacking cough', 'Croup', 'Bronchitis', 'Whooping cough'],
  },
  {
    category: 9,
    id: 27,
    text: `What disease, historically known as “the white death” or “consumption”, killed 1.2 million people in 2024?`,
    correctAnswer: 'Tuberculosis',
    answers: ['Cholera', 'Tuberculosis', 'Influenza', 'Measles'],
  },
  {
    category: 9,
    id: 28,
    text: `Schistosomiasis is also known by what name, due to the other host for the parasitic flatworms that cause it? It kills on the order of 100,000 people per year.`,
    correctAnswer: 'Snail fever',
    answers: ['Hippo fever', 'Stork fever', 'Elephantiasis', 'Snail fever'],
  },
  {
    category: 9,
    id: 29,
    text: `Which mosquito-borne disease gets its name from the Italian for “bad air”?`,
    correctAnswer: 'Malaria.',
    answers: ['Dengue fever', 'Malaria.', 'Yellow fever', 'Zika virus'],
    additionalInfo:
      'At its peak, malaria infested every continent except Antarctica. It killed an estimated 619,000 people in 2021.',
  },
  {
    category: 9,
    id: 30,
    text: `Hansen’s disease is another name for what Biblical disease?`,
    correctAnswer: 'Leprosy',
    answers: ['Plague', 'Smallpox', 'Leprosy', 'Cholera'],
  },
]

// TODO: Turn this into a proper AJAX call.
const getQuestions = (categories: number[]) => {
  if (categories.length === 0) {
    return questions
  } else {
    return questions.filter((q) => categories.includes(q.category))
  }
}

// TODO: Again, turn this into a proper AJAX call.
const getQuestionById = (id: number): Question | undefined => {
  return questions.find((q) => q.id === id)
}

// TODO: Turn this into a proper AJAX call.
const getRandomQuestionId = (categories: number[]): number => {
  const filteredQuestions = getQuestions(categories)

  if (filteredQuestions.length === 0) {
    throw new Error(`No questions available for the selected categories. ${categories.join(', ')}`)
  }

  let result: Question | undefined = undefined
  do {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length)
    result = filteredQuestions[randomIndex]
  } while (result === undefined)
  return result.id
}

export { getQuestions, getRandomQuestionId, getQuestionById, type Question }
