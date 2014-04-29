function calculate(){
    // fetch and display length of inputted text
    document.getElementById('length').innerHTML = document.getElementById('text').value.length;

    // reset letters
    document.getElementById('letters').innerHTML = '';

    // count how many times each letter appears in inputted text
    for(i = 0; i < 26; i++){
        var letter = String.fromCharCode(97 + i);

        var letter_count = document.getElementById('text').value.replace(
          new RegExp(
            '[^' + letter + ']',
            'g'
          ),
          ''
        ).length;

        // only display letters that appear in inputted text
        if(letter_count > 0){
            document.getElementById('letters').innerHTML +=
              letter
              + ' : '
              + letter_count
              + ' (' + ((letter_count / document.getElementById('text').value.length) * 100).toFixed(2)
              + '%)<br>';
        }
    }
}
