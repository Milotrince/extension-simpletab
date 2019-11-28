function loadFromStorage() {
    $('#background').css('opacity', 1)
    chrome.storage.local.get(null, function (data) {
        $('#background').css('background-image', "url('" + data['background'] + "')")
        $('#notes').val(data['notes'])
        $('#notes').css('visibility', toVisibility(data['showNotes']))
        $('#clock').css('visibility', toVisibility(data['showClock']))
        $('#options').css('visibility', toVisibility(data['showOptions']))

        if (data['darkMode']) {
            $('html').css('--main', '#1e1e1e');
            $('html').css('--main-l', '8%');
            $('html').css('--contrast', '#ffffff');
        } else {
            $('html').css('--main', '#ffffff');
            $('html').css('--main-l', '100%');
            $('html').css('--contrast', '#000000');
        }
    })
}

function updateClock() {
    let now = new Date()
    $('#date').text(now.toLocaleDateString())
    $('#hours').text(("0" + now.getHours()).slice(-2))
    $('#minutes').text(("0" + now.getMinutes()).slice(-2))
    $('#seconds').text(("0" + now.getSeconds()).slice(-2))

    toggleStyle('.colon', 'opacity', 0, 1)
}

function toggleStyle(id, property, a, b) {
    if ($(id).css(property) == a) {
        $(id).css(property, b)
    } else {
        $(id).css(property, a)
    }
}

function addWidgetListeners() {
    $('#notes').change(function() {
        chrome.storage.local.set({notes:$('#notes').val()})
    })
    $('#options').click(function() {
        chrome.tabs.create({url: chrome.extension.getURL('../html/options.html')})
    })
}

function setupPage() {
    loadFromStorage()
    updateClock()
    setInterval(updateClock, 1000)
    addWidgetListeners()
}

function toVisibility(value) {
    return value ? 'visible' : 'hidden';
}

$(document).ready(function() {
    setupPage();
})