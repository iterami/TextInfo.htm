'use strict';

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
