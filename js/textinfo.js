function calculate(){
    // Fetch and display length of inputted text.
    document.getElementById('length').innerHTML = document.getElementById('text').value.length;

    // Reset letters.
    document.getElementById('letters').innerHTML = '';
    var output = '';

    // Count how many times each letter appears in inputted text.
    for(var loop_counter = 0; loop_counter < 26; loop_counter++){
        var letter = String.fromCharCode(97 + loop_counter);

        var letter_count = document.getElementById('text').value.replace(
          new RegExp(
            '[^' + letter + ']',
            'g'// Global
          ),
          ''
        ).length;

        // Only display letters that appear in inputted text.
        if(letter_count > 0){
            output +=
              '<tr><td>'
              + letter
              + '</td><td>'
              + letter_count
              + '</td><td>'
              + ((letter_count / document.getElementById('text').value.length) * 100).toFixed(2)
              + '%</td></tr>';
        }
    }

    document.getElementById('letters').innerHTML = output;
}
