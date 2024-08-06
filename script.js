// script.js
document.getElementById('checkButton').addEventListener('click', async () => {
  const textInput = document.getElementById('textInput').value;
  const resultContainer = document.getElementById('resultContainer');

  resultContainer.innerHTML = 'Checking...';

  const response = await fetch('https://api.languagetool.org/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(textInput)}&language=en-US&enabledOnly=false`,
  });

  const data = await response.json();
  resultContainer.innerHTML = '';

  if (data.matches.length > 0) {
    data.matches.forEach((match) => {
      const issueElement = document.createElement('div');
      issueElement.classList.add('error');

      const suggestions = match.replacements.map(rep => rep.value).join(', ');

      issueElement.innerHTML = `
        <p><strong>Error:</strong> ${match.message}</p>
        <p><strong>Context:</strong> ${match.context.text}</p>
        <p><strong>Suggestions:</strong> ${suggestions}</p>
        <hr>
      `;
      resultContainer.appendChild(issueElement);
    });

    const suggestionElement = document.createElement('div');
    suggestionElement.classList.add('suggestion');
    suggestionElement.innerHTML = '<p><strong>Rewrite Suggestions:</strong></p>';

    const sentences = data.matches.map(match => match.replacements.map(rep => rep.value)).flat();

    if (sentences.length > 0) {
      sentences.forEach(sentence => {
        const p = document.createElement('p');
        p.textContent = sentence;
        suggestionElement.appendChild(p);
      });
      resultContainer.appendChild(suggestionElement);
    } else {
      suggestionElement.innerHTML += '<p>No rewrite suggestions available.</p>';
      resultContainer.appendChild(suggestionElement);
    }
  } else {
    resultContainer.innerHTML = '<p>No issues found. Your text looks good!</p>';
  }
});
