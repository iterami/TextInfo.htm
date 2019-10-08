'use strict';

function fetch_keyinfo(key){
    core_storage_save();

    document.getElementById('key-single').innerHTML =
      '<span class=medium>'
        + key
        + '</span><br>KeyCode: '
        + key.charCodeAt(0);
}

function fetch_keyinfo_keycode(){
    fetch_keyinfo(String.fromCharCode(document.getElementById('keycode').value));
}

function generate_list(){
    core_storage_save();

    let loop_counter = core_storage_data['keycode-range'] - 1;
    if(loop_counter < 0){
        return;
    }

    let temp = [];
    do{
        temp.splice(
          0,
          0,
          '<a href=javascript:; onclick="fetch_keyinfo(this.innerHTML)" style="border:1px solid #aaa;display:inline-block;height:1em;text-decoration:none;width:25px">' + String.fromCharCode(core_storage_data['base-keycode'] + loop_counter) + '</a>'
        );
    }while(loop_counter--);

    document.getElementById('key-list').innerHTML = temp.join(' ');
}
