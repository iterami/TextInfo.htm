'use strict';

function repo_init(){
    core_repo_init({
      'storage': {
        'base-keycode': 0,
        'key': 'H',
        'keycode': 72,
        'keycode-range': 1000,
      },
      'title': 'KeyInfo.htm',
    });

    core_storage_update();

    document.getElementById('fetch-keyinfo-key').onclick = fetch_keyinfo_key;
    document.getElementById('fetch-keyinfo-keycode').onclick = fetch_keyinfo_keycode;
    document.getElementById('generate').onclick = generate_list;

    document.getElementById('text').oninput = function(){
        // Fetch lowercase value.
        var value = this.value.toLowerCase();

        // Display length of inputted text.
        document.getElementById('length').innerHTML = value.length;

        // Reset characters.
        var element = document.getElementById('characters');
        element.innerHTML = '';
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
              + ((character_count / value.length) * 100).toFixed(7)
              + '%</td></tr>';
        }

        element.innerHTML = output;
    };
}
