'use strict';

document.getElementById('text').oninput = function(){
    // Fetch lowercase value.
    var value = this.value.toLowerCase();

    // Display length of inputted text.
    document.getElementById('length').innerHTML = value.length;

    // Reset letters.
    document.getElementById('letters').innerHTML = '';
    var letters = 'abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+={}|:;"\'<,>.?/'.split('');
    var output = '';

    // Count how many times each letter appears in inputted text.
    for(var letter in letters){
        var letter_count = value.replace(
          new RegExp(
            '[^' + letters[letter] + ']',
            'g'// Global
          ),
          ''
        ).length;

        // Only display letters that appear in inputted text.
        if(letter_count <= 0){
            continue;
        }

        output +=
          '<tr><td>'
          + letters[letter]
          + '</td><td>'
          + letter_count
          + '</td><td>'
          + ((letter_count / value.length) * 100).toFixed(2)
          + '%</td></tr>';
    }

    document.getElementById('letters').innerHTML = output;
};
