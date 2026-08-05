/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            SKYRIM: 'Skyrim',
            OBLIVION: 'Oblivion',
            MORROWIND: 'Morrowind',
            SKILL_NAME: 'T. E. S. Facts',
            START_MESSAGE: 'Greetings, traveler. What are you here for?',
            START_REPROMPT: 'This spell holds great knowledge, for those who know its language... Have you tried queries of the lands of Skyrim? Or Morrowind?',
            GET_FACT_MESSAGE: 'Here\'s a tidbit of %s knowledge: ',
            GET_FACT_MESSAGE_PERSONALIZED: 'Lord %s, a %s fact for you: ',
            HELP_MESSAGE: 'You might say tell me a fact, or, you can end the spell... How may I assist?',
            HELP_REPROMPT: 'What knowledge do you seek?',
            FALLBACK_MESSAGE: 'This Facts skill can\'t help you with that.  It tell you fun facts related to The Elder Scrolls if you say tell me a fact. What can I help you with?',
            FALLBACK_REPROMPT: 'What can I help you with?',
            ERROR_MESSAGE: 'Sorry, an error occurred.',
            PREFERENCE_ERROR: 'Sorry, I am unable to retrieve your personalized identity.',
            STOP_MESSAGE: 'May Talos guide you!',
            CONFIRMATION_MESSAGE: 'Ok %s, I have added %s to your tome of interest.',
            SKYRIM_FACTS:
                [
                    'Following the signing of the White-Gold Concordat, Talos worship is banned in the Empire.',
                    'There have been rumors of a Dragonborn appearing near Whiterun.',
                    'The Throat of the World is the highest mountin in all of Skyrim, and home to the Greybeards sect of monks.',
                    'The Companions serve the people of Skyrim as Ysgramor\'s five hundred companions once did, having replaced the Fighter\'s guild in the Fourth Era as Skyrim\'s honorable mercenary group.',
                    'The Volkihar are the most powerful clan of vampires in Skyrim, and predominantly reside in frozen lakes.',
                ],
            OBLIVION_FACTS:
                [
                    'The Imperial City is the capital of Cyrodil.',
                    'Martin Septim is the illegitimate heir to the Cyrodillic Empire.',
                    'The Dragonfires in the Imperial City are lit by the Emperor on their coronation day to strengthen the barrier between the planes of Oblivion and Mundus.',
                    'Jyggalag, the Daedric prince of Order, has been cursed to live as the Daedric prince of Madness, Sheagorath.',
                    'The Blades are the Empire\'s secret security force, answering directly to the Emperor.',
                ],
            MORROWIND_FACTS:
                [
                    'Azura\'s prophecy declares that Indoril Nerevar will be reincarnated as the Nerevarine, to slay the Tribunal of Morrowind.',
                    'As of the early Third Era, the East Empire Company conducts mining operations on Solstheim.',
                    'Dagoth Ur, the immortal Sharmat, was originally known as Voryn Dagoth.',
                    'Outlanders may join a Great House of the Dunmer, most commonly as a retainer, or by being adopted in.',
                    'In the early Fourth Era, House Hlaalu was replaced by House Sadras on the Grand Council.',
                    'House Dagoth was once the sixth Great House, but have been branded the \'Traitor House\' since the Battle of Red Mountain.',
                    'The island of Vvardenfell is home to the Red Mountain, a massive, mostly dormant volcano.',
                    'House Telvanni is known as highly insular, and distrustful of outsiders.',
                    'The Mages Guild have come to conflict with House Telvanni over control of the practice and teaching of magical arts.',
                    'Morrowind is home to the Morag Tong, an ancient guild of assassins with a strict code of ethics.',
                    'The Tribunal of Morrowind is made up of Vivec, Almalexia, and Sotha Sil.',
                ],
        }
    },
    es: {
        translation: {
            SPACE: 'Espacio',
            FOOTBALL: 'FÃºtbol',            
            SKILL_NAME: '%s Curiosidades',
            GET_FACT_MESSAGE: 'AquÃ­ estÃ¡ tu curiosidad: ',
            GET_FACT_MESSAGE_PERSONALIZED: 'Vale %s, AquÃ­ estÃ¡ tu curiosidad: ',
            HELP_MESSAGE: 'Puedes decir dime una curiosidad del espacio o puedes decir salir... CÃ³mo te puedo ayudar?',
            HELP_REPROMPT: 'Como te puedo ayudar?',
            FALLBACK_MESSAGE: 'La habilidad de Hechos no puede ayudarte con eso. Puede ayudarte a descubrir hechos si dices cuÃ©ntame un hecho. Â¿En quÃ© te puedo ayudar?',
            FALLBACK_REPROMPT: 'Como te puedo ayudar?',
            ERROR_MESSAGE: 'Lo sentimos, se ha producido un error.',
            PREFERENCE_ERROR: 'Lo siento, no puedo recuperar su identidad personalizada',
            STOP_MESSAGE: 'AdiÃ³s!',
            CONFIRMATION_MESSAGE: 'Vale %s, he aÃ±adido %s como curiosidad favorita.',
            SPACE_FACTS:
                [
                    'Un aÃ±o en Mercurio es de solo 88 dÃ­as',
                    'A pesar de estar mÃ¡s lejos del Sol, Venus tiene temperaturas mÃ¡s altas que Mercurio',
                    'En Marte el sol se ve la mitad de grande que en la Tierra',
                    'Jupiter tiene el dÃ­a mÃ¡s corto de todos los planetas',
                    'El sol es una esfÃ©ra casi perfecta',
                ],
            FOOTBALL_FACTS:
                [
                    'El fÃºtbol es el deporte mÃ¡s visto y mÃ¡s jugado del mundo.',
                    'El gol mÃ¡s rÃ¡pido jamÃ¡s marcado tomÃ³ solo 2.4 segundos',
                    'Solo 8 paÃ­ses han ganado la Copa del Mundo',
                ],
        }
    },
}
