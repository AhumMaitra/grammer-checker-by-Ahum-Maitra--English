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
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');
      const suggestions = match.replacements.map(rep => rep.value).join(', ');

      errorElement.innerHTML = `
        <p><strong>Error:</strong> ${match.message}</p>
        <p><strong>Context:</strong> ${match.context.text}</p>
        <p><strong>Suggestions:</strong> ${suggestions}</p>
        <hr>
      `;

      resultContainer.appendChild(errorElement);

      // Highlight the errors in the text area
      const text = document.getElementById('textInput').value;
      const beforeText = text.slice(0, match.offset);
      const errorText = text.slice(match.offset, match.offset + match.length);
      const afterText = text.slice(match.offset + match.length);

      document.getElementById('textInput').value = `${beforeText}[${errorText}]${afterText}`;
    });
  } else {
    resultContainer.innerHTML = '<p>No issues found. Your text looks good!</p>';
  }
});
