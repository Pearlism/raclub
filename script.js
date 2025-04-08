
const form = document.getElementById('uploadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  document.getElementById('link').innerHTML = `<a href="${data.url}" target="_blank">${data.url}</a>`;
  loadFileList();
});

async function loadFileList() {
  const res = await fetch('/files');
  const files = await res.json();
  const list = document.getElementById('fileList');
  list.innerHTML = '';
  files.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="/uploads/${file}" target="_blank">${file}</a>
      <button onclick="renameFile('${file}')">Rename</button>
      <button onclick="deleteFile('${file}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deleteFile(filename) {
  await fetch('/delete/' + filename, { method: 'DELETE' });
  loadFileList();
}

async function renameFile(oldName) {
  const newName = prompt('Enter new file name:');
  if (newName) {
    await fetch('/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName, newName })
    });
    loadFileList();
  }
}

window.onload = loadFileList;
