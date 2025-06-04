chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarize") {
      const pageText = document.body.innerText || ""; // Extract visible text from the webpage
      sendResponse({ text: pageText });
    }
  });
  
