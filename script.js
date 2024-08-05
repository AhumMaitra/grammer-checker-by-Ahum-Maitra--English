async function checkGrammar() {
    const text = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    output.innerHTML = '';

    // Replace the base URL with the appropriate endpoint for your chosen API.
    const apiUrl = 'https://api.languagetool.org/v2/check';
    const params = new URLSearchParams({
        text: text,
        language: 'en-US',
    });

    try {
        const response = await fetch(`${apiUrl}?${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const data = await response.json();

        if (data.matches.length === 0) {
            output.innerHTML = 'No mistakes found.';
        } else {
            data.matches.forEach(match => {
                const from = match.offset;
                const to = match.offset + match.length;
                const errorText = text.substring(from, to);
                const suggestion = match.replacements.length > 0 ? match.replacements[0].value : 'No suggestion available';

                output.innerHTML += `Mistake: "${errorText}" - Suggestion: "${suggestion}"<br>`;
            });
        }
    } catch (error) {
        output.innerHTML = 'Error checking text. Please try again.';
    }
}
