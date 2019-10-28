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

    let temp = [];
    do{
        let code = core_storage_data['base-keycode'] + loop_counter;
        let char = String.fromCharCode(code);

        temp.splice(
          0,
          0,
          '<a href="javascript:fetch_keyinfo_keycode(' + code + ');" style="border:1px solid #aaa;display:inline-block;height:1em;text-decoration:none;width:25px">' + char + '</a>'
        );
    }while(loop_counter--);

    document.getElementById('key-list').innerHTML = temp.join(' ');
}
