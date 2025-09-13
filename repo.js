'use strict';

function fetch_keyinfo(key){
    core_storage_save();
    const code = key.charCodeAt(0);

    core_elements.key_single.innerHTML =
      '<span class=medium>' + key + '</span>'
        + '<br>Code: ' + code
        + '<br>Hex: ' + code.toString(16).toUpperCase();
}

function fetch_keyinfo_code(code){
    fetch_keyinfo(String.fromCharCode(code));
}

function generate_list(){
    core_storage_save();

    let loop_counter = core_storage_data.code_range - 1;
    if(loop_counter < 0){
        return;
    }

    const keys = [];
    do{
        const code = core_storage_data.base_code + loop_counter;
        const char = String.fromCharCode(code);

        keys.splice(
          0,
          0,
          '<a href="javascript:fetch_keyinfo_code(' + code + ');" style="border:1px solid #aaa;display:inline-block;height:1em;text-decoration:none;width:25px">' + char + '</a>'
        );
    }while(loop_counter--);

    core_elements.key_list.innerHTML = keys.join(' ');
}

function repo_init(){
    core_repo_init({
      'events': {
        'fetch_keyinfo_key': {
          'onclick': function(){
              fetch_keyinfo(core_elements.key.value);
          },
        },
        'fetch_keyinfo_code': {
          'onclick': function(){
              fetch_keyinfo_code(core_elements.code.value);
          },
        },
        'generate': {
          'onclick': generate_list,
        },
        'text': {
          'oninput': function(){
              const value = this.value.toLowerCase();
              core_elements.length.textContent = value.length;
              core_elements.lines.textContent = value.split(/\n/).length;

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

              core_elements.characters.innerHTML = output;
          },
        },
      },
      'storage': {
        'base_code': 0,
        'code': 72,
        'code_range': 100,
        'key': 'H',
      },
      'title': 'TextInfo.htm',
      'ui_elements': [
        'characters',
        'code',
        'key',
        'key_list',
        'key_single',
        'length',
        'lines',
      ],
    });
}
