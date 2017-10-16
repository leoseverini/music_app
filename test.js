var test = function(scale, notes, trans){
    var noteTrans = [];
   
    for(note in notes){
        var sindex =  getIndex(scale, notes[note] )
        // console.log(sindex + trans);
        noteTrans.push(scale[(parseInt(sindex) + parseInt(trans-1)) % 7])
    }
    console.log(noteTrans);
}

var getIndex = function(scale, note )
{
    var n =0
    for(n in scale) {
        if(scale[n] == note){
            // console.log(" " + n + " : " + scale[n])
            return n;
        }
            
    }
    return -1;
}


// var scale = [ "C", "D", "E", "F", "G","A", "B" ]
// var notes = ["E","E", "F","G","E","D", "C"]
// var trans = 3; Third Interval 
// test(scale, notes, trans);

var scale = [ "D", "E", "F#", "G","A", "B" ,"C#" ]
var notes = ["E","E", "F#","G","E","D", "C#"]
var trans = 5; // 5th interval
test(scale, notes, trans);


 var MAYOR = [ "C", "D", "E", "F", "G","A", "B" ]
 var MINOR = [ "C", "D", "Eb", "F", "G","Ab", "Bb" ]