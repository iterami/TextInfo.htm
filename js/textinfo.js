'use strict';

function fetch_keyinfo(key){
    settings_save();

    document.getElementById('key-single').innerHTML =
      '<span class=medium>'
        + key
        + '</span><br>CharCode: '
        + key.charCodeAt(0);
}

function fetch_keyinfo_key(){
    fetch_keyinfo(document.getElementById('key').value);
}

function fetch_keyinfo_keycode(){
    fetch_keyinfo(String.fromCharCode(document.getElementById('keycode').value));
}

function generate_list(){
    settings_save();

    var loop_counter = settings_settings['keycode-range'] - 1;
    if(loop_counter < 0){
        return;
    }

    var temp = [];
    do{
        temp.splice(
          0,
          0,
          '<a onclick="fetch_keyinfo(this.innerHTML)">' + String.fromCharCode(settings_settings['base-keycode'] + loop_counter) + '</a>'
        );
    }while(loop_counter--);

    document.getElementById('key-list').innerHTML = temp.join(' ');
}

window.onload = function(e){
    settings_init({
      'prefix': 'KeyInfo.htm-',
      'settings': {
        'base-keycode': 0,
        'key': 'H',
        'keycode': 72,
        'keycode-range': 1000,
      },
    });

    settings_update();

    document.getElementById('fetch-keyinfo-key').onclick = fetch_keyinfo_key;
    document.getElementById('fetch-keyinfo-keycode').onclick = fetch_keyinfo_keycode;
    document.getElementById('generate').onclick = generate_list;
    document.getElementById('settings-reset').onclick = settings_reset;

    document.getElementById('text').oninput = function(){
        // Fetch lowercase value.
        var value = this.value.toLowerCase();

        // Display length of inputted text.
        document.getElementById('length').innerHTML = value.length;

        // Reset characters.
        document.getElementById('characters').innerHTML = '';
        var characters = '0123456789abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+={}|:;"\'<,>.?/'.split('');
        var output = '';

        // Count how many times each character appears in inputted text.
        for(var character in characters){
            var character_count = value.replace(
              new RegExp(
                '[^' + characters[character] + ']',
                'g'// Global
              ),
              ''
            ).length;

            // Only display characters that appear in inputted text.
            if(character_count <= 0){
                continue;
            }

            output +=
              '<tr><td>'
              + characters[character]
              + '</td><td>'
              + character_count
              + '</td><td>'
              + ((character_count / value.length) * 100).toFixed(2)
              + '%</td></tr>';
        }

        document.getElementById('characters').innerHTML = output;
    };
};
