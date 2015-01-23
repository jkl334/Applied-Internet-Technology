//problem 1 - flattening
var arrays = [[1], [2, 3], [4, 5, 6]];

console.log(arrays.reduce(function(flat, current) {
  return flat.concat(current);
}, []));


//problem 2 - Every and then some

function every(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }
  return true;
}

function some(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true;
    }
  }
  return false;
}
function divisibleByThree(number){
	if(number % 3 === 0)
	{
		return true;
	}
	else 
		return false;
}

function isLengthNine(word){
	if(word.length === 9)
	{
		return true;
	}
	else 
		return false;
}
console.log("Running Every...");
console.log(every([9, 48, 204, 528942], divisibleByThree));
console.log("Running Some...");
console.log(some(['aardvark', 'abbreviate', 'abacuses', 'abadoners', 
	'abalones'], isLengthNine));