'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'fetch-keyinfo-key': {
          'onclick': fetch_keyinfo_key,
        },
        'fetch-keyinfo-keycode': {
          'onclick': fetch_keyinfo_keycode,
        },
        'generate': {
          'onclick': generate_list,
        },
        'text': {
          'oninput': function(){
              // Fetch lowercase value.
              var value = this.value.toLowerCase();

              // Display length of inputted text.
              document.getElementById('length').innerHTML = value.length;

              // Reset characters.
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

              core_html_modify({
                'id': 'characters',
                'properties': {
                  'innerHTML': output,
                },
              });
          },
        },
      },
      'storage': {
        'base-keycode': 0,
        'key': 'H',
        'keycode': 72,
        'keycode-range': 1000,
      },
      'title': 'TextInfo.htm',
    });
}
