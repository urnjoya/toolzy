// COPY 
function copyResult() {
    const text = document.getElementById('result').textContent;
    if (text == 'Your result will appear here...') {
        showNotification('No result to copy', "error");
        return;
    }
    copyToClipboard(text, document.getElementById('copy-btn'));
}
// CLEAR ALL
function clearAll() {
    document.getElementById('input-text').value = '';
    document.getElementById('result').textContent = 'Your result will appear here...';
}
function copyResultEditor() {
    const resultEl = document.getElementById("result");
    if (resultEl == 'Your result will appear here...') {
        showNotification('No result to copy', "error");
        return;
    }
    copyToClipboard(resultEl, document.getElementById('copy-btn'));
}
function clearAllEditor() {
    document.getElementById("input-text").innerHTML = "";
    document.getElementById("result").innerHTML = "Your result will appear here...";
}