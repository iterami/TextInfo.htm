'use strict';

function fetch_keyinfo(key){
    core_storage_save();

    document.getElementById('key-single').innerHTML =
      '<span class=medium>'
        + key
        + '</span><br>KeyCode: '
        + key.charCodeAt(0);
}

function fetch_keyinfo_keycode(code){
    fetch_keyinfo(String.fromCharCode(code));
}

function generate_list(){
    core_storage_save();

    let loop_counter = core_storage_data['keycode-range'] - 1;
    if(loop_counter < 0){
        return;
    }

    const temp = [];
    do{
        const code = core_storage_data['base-keycode'] + loop_counter;
        const char = String.fromCharCode(code);

        temp.splice(
          0,
          0,
          '<a href="javascript:fetch_keyinfo_keycode(' + code + ');" style="border:1px solid #aaa;display:inline-block;height:1em;text-decoration:none;width:25px">' + char + '</a>'
        );
    }while(loop_counter--);

    document.getElementById('key-list').innerHTML = temp.join(' ');
}

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
                    + (character_count / value.length) * 100
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
        'keycode-range': 100,
      },
      'title': 'TextInfo.htm',
    });
}
