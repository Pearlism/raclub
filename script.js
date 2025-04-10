async function countAccounts() {
    try {
        // Check if the file exists and is accessible
        const response = await fetch('gen.txt');
        
        if (!response.ok) {
            throw new Error(`Failed to load gen.txt - HTTP error: ${response.status}`);
        }

        const text = await response.text();
        
        // Check if the file is empty
        if (!text.trim()) {async function countAccounts() {
    try {
        // Use a URL to a hosted text file (e.g., in your GitHub repository)
        const response = await fetch('https://raw.githubusercontent.com/Pearlism/raclub/refs/heads/main/gen.txt');
        
        if (!response.ok) {
            throw new Error(`Failed to load gen.txt - HTTP error: ${response.status}`);
        }

        const text = await response.text();
        
        if (!text.trim()) {
            throw new Error('gen.txt file is empty');
        }

        const accounts = text.split('\n').filter(line => line.trim() !== '');
        const counter = document.getElementById('accountsCounter');
        
        counter.innerHTML = `
            <i class="fas fa-database"></i> Available Accounts: 
            <span>${accounts.length}</span>
        `;

        return accounts;

    } catch (error) {
        document.getElementById('accountsCounter').textContent = 
            `Error loading accounts: ${error.message}`;
        console.error('Account loading error:', error);
        return [];
    }
}

            throw new Error('gen.txt file is empty');
        }

        const accounts = text.split('\n').filter(line => line.trim() !== '');
        const counter = document.getElementById('accountsCounter');
        
        counter.innerHTML = `
            <i class="fas fa-database"></i> Available Accounts: 
            <span>${accounts.length}</span>
        `;

        return accounts;

    } catch (error) {
        document.getElementById('accountsCounter').textContent = 
            `Error loading accounts: ${error.message}`;
        console.error('Account loading error:', error);
        return [];
    }
}


async function generateAccount() {
    try {
        const accounts = await countAccounts();
        
        if (accounts.length === 0) {
            throw new Error('No accounts available');
        }
        
        const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
        const resultBox = document.getElementById('resultBox');
        
        
        resultBox.classList.remove('animate');
        
       
        void resultBox.offsetWidth;
        
       
        resultBox.classList.add('animate');
        resultBox.textContent = randomAccount;
        
    } catch (error) {
        document.getElementById('resultBox').textContent = 'Error: ' + error.message;
    }
}

async function copyToClipboard() {
    const text = document.getElementById('resultBox').textContent;
    const copySuccess = document.getElementById('copySuccess');
    
    try {
        await navigator.clipboard.writeText(text);
        
        
        copySuccess.classList.add('show');
        
        
        setTimeout(() => {
            copySuccess.classList.remove('show');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}


document.addEventListener('DOMContentLoaded', countAccounts);