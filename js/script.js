document.addEventListener('DOMContentLoaded', function () {
    var sunIcon = document.getElementById('sunIcon');
    var moonIcon = document.getElementById('moonIcon');
    var body = document.body;

    // Initial setting based on user preference or default
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    sunIcon.addEventListener('click', function () {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    });

    moonIcon.addEventListener('click', function () {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    });

    var composeButton = document.getElementById('composeButton');
    var clearButton = document.getElementById('clearButton');
    var confirmClearButton = document.getElementById('confirmClearButton');
    var entryList = document.getElementById('entryList');
    var clearModal = document.getElementById('clearModal'); // Ensure this matches the clear modal in the HTML

    composeButton.addEventListener('click', function () {
        var entryCodeInput = document.getElementById('codeInput').value.trim();
        var entryTextInput = document.getElementById('noteInput').value.trim();
        if (entryCodeInput && entryTextInput) {
            var timestamp = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            saveEntry(entryCodeInput, entryTextInput, timestamp);
            document.getElementById('codeInput').value = '';
            document.getElementById('noteInput').value = '';
            addEntryToDOM(entryCodeInput, entryTextInput, timestamp);
        } else {
            alert("Please write an entry before submitting.");
        }
    });

    clearButton.addEventListener('click', function () {
        $('#clearModal').modal('show');
    });

    confirmClearButton.addEventListener('click', function () {
        localStorage.removeItem('journalEntries');
        entryList.innerHTML = '';
        $('#clearModal').modal('hide');
    });

    window.addEventListener('click', function (event) {
        if (event.target == clearModal) {
            $('#clearModal').modal('hide');
        }
    });

    function saveEntry(entryCodeInput, entryTextInput, timestamp) {
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ entryCodeInput: entryCodeInput, entryTextInput: entryTextInput, timestamp: timestamp });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entryList.innerHTML = '';
        var entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(function (entryData) {
            addEntryToDOM(entryData.entryCodeInput, entryData.entryTextInput, entryData.timestamp);
        });
    }

    function addEntryToDOM(entryCodeInput, entryTextInput, timestamp) {
        var div = document.createElement('div');
        div.className = 'entry-box';
        div.innerHTML = '<p>' + entryCodeInput + '</p><p>' + entryTextInput + '</p><p class="entry-timestamp">' + timestamp + '</p>';
        entryList.appendChild(div);
    }
});