document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    // Create textarea element
    const textarea = document.createElement('textarea');
    textarea.id = 'text-input';
    textarea.rows = 10;
    textarea.cols = 50;

    // Create submit button
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.onclick = () => {
        const text = textarea.value;
        const wordFrequency = getWordFrequency(text);
        console.log(wordFrequency);
        renderFrequencyTable(wordFrequency);
    };

    // Append textarea and button to root
    root.appendChild(textarea);
    root.appendChild(button);
});

function getWordFrequency(text) {
    const words = text.split(/\s+/).filter(word => word);
    const frequency = {};

    words.forEach(word => {
        const normalizedWord = word.toLowerCase();
        frequency[normalizedWord] = (frequency[normalizedWord] || 0) + 1;
    });

    return frequency;
}

function renderFrequencyTable(frequency) {
    const root = document.getElementById('root');

    // Remove existing table if any
    const existingTable = document.querySelector('table');
    if (existingTable) {
        root.removeChild(existingTable);
    }

    const sortedWords = Object.keys(frequency)
        .sort((a, b) => frequency[b] - frequency[a] || a.localeCompare(b))
        .slice(0, 5);

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const wordHeader = document.createElement('th');
    const frequencyHeader = document.createElement('th');

    wordHeader.textContent = 'word_name';
    frequencyHeader.textContent = 'word_frequency';

    headerRow.appendChild(wordHeader);
    headerRow.appendChild(frequencyHeader);
    table.appendChild(headerRow);

    sortedWords.forEach(word => {
        const row = document.createElement('tr');
        const wordCell = document.createElement('td');
        const frequencyCell = document.createElement('td');

        wordCell.textContent = word;
        frequencyCell.textContent = frequency[word];

        row.appendChild(wordCell);
        row.appendChild(frequencyCell);
        table.appendChild(row);
    });

    root.appendChild(table);
}
