'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'fetch-keyinfo-key': {
          'onclick': function(){
              fetch_keyinfo(document.getElementById('key').value);
          },
        },
        'fetch-keyinfo-keycode': {
          'onclick': function(){
              fetch_keyinfo_keycode(document.getElementById('keycode').value);
          },
        },
        'generate': {
          'onclick': generate_list,
        },
        'text': {
          'oninput': function(){
              // Fetch lowercase value.
              let value = this.value.toLowerCase();

              // Display length of inputted text.
              document.getElementById('length').textContent = value.length;

              // Display line count.
              document.getElementById('lines').textContent = value.split(/\n/).length;

              // Reset characters.
              let characters = '0123456789abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+={}|:;"\'<,>.?/'.split('');
              let output = '';

              // Count how many times each character appears in inputted text.
              for(let character in characters){
                  let character_count = value.replace(
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
                    + core_round({
                      'number': (character_count / value.length) * 100,
                    }) + '%</td></tr>';
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
