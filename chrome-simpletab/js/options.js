function loadSettings() {
    chrome.storage.local.get(null, function (data) {
        $('#bg-image').val(data['background'])
        $('#dark-mode').prop('checked', data['darkMode'])
        $('#show-notes').prop('checked', data['showNotes'])
        $('#show-clock').prop('checked', data['showClock'])
        $('#show-options').prop('checked', data['showOptions'])
    })
}

$(document).ready(function() {
    loadSettings()
    setupPage()
    $('#save').click(function() {
        let options = {
            background:$('#bg-image').val(),
            darkMode:$('#dark-mode').is(':checked'),
            showNotes:$('#show-notes').is(':checked'),
            showClock:$('#show-clock').is(':checked'), 
            showOptions:$('#show-options').is(':checked')
        }
        chrome.storage.local.set(options)
        setupPage()
    })
})