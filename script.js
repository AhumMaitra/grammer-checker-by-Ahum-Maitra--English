function checkGrammar() {
    const text = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    output.innerHTML = '';

    // Simple grammar check example
    // For demonstration purposes, we will only check for a few common mistakes
    const commonMistakes = [
        { regex: /\bthere\b/, suggestion: 'Did you mean "their" or "they\'re"?' },
        { regex: /\byour\b/, suggestion: 'Did you mean "you\'re"?' },
        { regex: /\btheyre\b/, suggestion: 'Did you mean "they\'re"?' }
    ];

    commonMistakes.forEach(mistake => {
        const found = text.match(mistake.regex);
        if (found) {
            output.innerHTML += `Mistake found: "${found[0]}" - ${mistake.suggestion}\n`;
        }
    });

    if (output.innerHTML === '') {
        output.innerHTML = 'No mistakes found.';
    }
}
