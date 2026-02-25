'use strict';

function fetch_keyinfo(key){
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
    if(core_elements.code_range.value < 1){
        return;
    }

    const keys = [];
    for(let i =  0; i < core_elements.code_range.value; i++){
        const code = core_elements.base_code.value + i;
        const char = String.fromCharCode(code);
        keys.push(
          '<a href="javascript:fetch_keyinfo_code(' + code + ');" style="border:1px solid #aaa;display:inline-block;height:1em;text-decoration:none;width:25px">' + char + '</a>'
        );
    }
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
      'title': 'TextInfo.htm',
      'ui_elements': [
        'base_code',
        'characters',
        'code',
        'code_range',
        'key',
        'key_list',
        'key_single',
        'length',
        'lines',
      ],
    });
}
