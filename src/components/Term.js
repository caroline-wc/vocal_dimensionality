const term = ['nervous',
'skeptical',
'lazy',
'neutral',
'slow',
'relaxed',
'demanding',
'loyal',
'bored',
'funny',
'sarcastic',
'dramatic',
'bossy',
'boring',
'shy',
'strong',
'questioning',
'firm',
'excitable',
'soft',
'upbeat',
'emotional',
'enthusiastic',
'energetic',
'humorous',
'plain',
'outspoken',
'timid',
'kind',
'dull']

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


var termOrder = shuffle(term); 


export default termOrder; 