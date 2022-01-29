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
              const value = this.value.toLowerCase();
              document.getElementById('length').textContent = value.length;
              document.getElementById('lines').textContent = value.split(/\n/).length;

              const characters = '0123456789abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+={}|:;"\'<,>.?/'.split('');
              let output = '';
              for(const character in characters){
                  const character_count = value.replace(
                    new RegExp(
                      '[^' + characters[character] + ']',
                      'g'
                    ),
                    ''
                  ).length;

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
        'keycode-range': 100,
      },
      'title': 'TextInfo.htm',
    });
}
