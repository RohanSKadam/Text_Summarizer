document.getElementById('summarize').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: summarizePage,
    });
});

function summarizePage() {
    const content = document.body.innerText;
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Your api key`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Summarize the following text: ${content}` }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const summary = data.choices[0].message.content;
        document.getElementById('summary').innerText = summary;
    })
    .catch(error => console.error('Error:', error));
}
