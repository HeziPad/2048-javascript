/**
 * @author Yehezkel
 */
$(document).ready(function() {
	var takenSpots = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // keeping track of where there are squares
	var fired = false; // flag for setting keyDown enent only 1 time per press/hold
	var i,j = 0; //parameters for loops
	
	spawnSquare();
    $(document).keydown(function(key) {
    	if (!fired){
    		fired = true;
	        switch(parseInt(key.which,10)) {
				// Left arrow key pressed
				case 37:
				slideLeft();
				spawnSquare();
					break;
				// Up Arrow Pressed
				case 38:
				slideUp();
				spawnSquare();
					// Put our code here
					break;
				// Right Arrow Pressed
				case 39:
				slideRight();
				spawnSquare();
					// Put our code here
					break;
				// Down Arrow Pressed
				case 40:
				slideDown();
				spawnSquare();
					// Put our code here
					break;
			}
		}
	});
	$(document).keyup(function(){
		fired = false;
	});
	
	function slideDown(){
		var anyReasonToContinue = true;
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( i = 3 ; i >= 1 ; i-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( j = 4 ; j >= 1 ; j-- ){ //Moving over columns
					if (takenSpots[i-1][j-1] === 1){ //checking if ther is a square on r(i)c(j)
						if (takenSpots[(i-1)+1][j-1] === 0){//checking if ther is a square 1 cell below 
							takenSpots[i-1][j-1] = 0;//updating takenSpots before transition
							takenSpots[(i-1)+1][j-1] = 1;
							$('div#r' + i + 'c' + j).attr('id',('r' + (i+1).toString() + 'c'+ j));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}

// i = rows. j = colums. arrays start from index 0 so actually (i-1) = row, (j-1) = column.

	function slideUp(){
		var anyReasonToContinue = true;
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( i = 2 ; i <= 4 ; i++ ){ // Moving over rows. No need to slideDown last row. Think
				for ( j = 4 ; j >= 1 ; j-- ){ //Moving over columns
					if (takenSpots[i-1][j-1] === 1){ //checking if ther is a square on r(i)c(j)
						if (takenSpots[(i-1)-1][j-1] === 0){//checking if ther is a square 1 cell below 
							takenSpots[i-1][j-1] = 0;//updating takenSpots before transition
							takenSpots[(i-1)-1][j-1] = 1;
							$('div#r' + i + 'c' + j).attr('id',('r' + (i-1).toString() + 'c'+ j));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}
	
	function slideRight(){
		var anyReasonToContinue = true;
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( j = 3 ; j >= 1 ; j-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( i = 4 ; i >= 1 ; i-- ){ //Moving over columns
					if (takenSpots[i-1][j-1] === 1){ //checking if ther is a square on r(i)c(j)
						if (takenSpots[i-1][(j-1)+1] === 0){//checking if ther is a square 1 cell below 
							takenSpots[i-1][j-1] = 0;//updating takenSpots before transition
							takenSpots[i-1][(j-1)+1] = 1;
							$('div#r' + i + 'c' + j).attr('id',('r' + i + 'c'+ (j+1).toString()));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}
	
	function slideLeft(){
		var anyReasonToContinue = true;
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( j = 2 ; j <= 4 ; j++ ){ // Moving over rows. No need to slideDown last row. Think
				for ( i = 4 ; i >= 1 ; i-- ){ //Moving over columns
					if (takenSpots[i-1][j-1] === 1){ //checking if ther is a square on r(i)c(j)
						if (takenSpots[i-1][(j-1)-1] === 0){//checking if ther is a square 1 cell below 
							takenSpots[i-1][j-1] = 0;//updating takenSpots before transition
							takenSpots[i-1][(j-1)-1] = 1;
							$('div#r' + i + 'c' + j).attr('id',('r' + i + 'c'+ (j-1).toString()));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}
	
	function spawnSquare(){
		do {
			var randomCell = Math.floor(Math.random()*16) + 1;
		} while (!checkAvailable( randomCell ));
		
		
		var row = Math.floor((randomCell - 1) / 4) + 1; // generated cell row 
		var column = ((randomCell - 1) % 4) + 1; // generated cell column
		
		takenSpots[row-1][column-1] = 1;
		
		// generating appropriate  <div> element
		$('div#main').append('<div class="square" id="r' + row + 'c' + column + '"></div>');
		var $generatedDiv = $('div#r' + row + 'c' + column);
		
		var twoOrFour = (Math.floor(Math.random()*2) + 1)*2; // randomly generates 2 or 4
		$generatedDiv.append('<p class="' + twoOrFour + '">' + twoOrFour + '</p>'); // setting 2 or 4 in new spawned sqaure
		
		$generatedDiv.hide();//effects
		$generatedDiv.fadeIn('fast');//effects
	}
	
	function checkAvailable( cell ){
		switch(cell){
			case 1:
				var cellAvailable = document.getElementById("r1c1") ? false : true;
				break;
			case 2:
				var cellAvailable = document.getElementById("r1c2") ? false : true;
				break;
			case 3:
				var cellAvailable = document.getElementById("r1c3") ? false : true;
				break;
			case 4:
				var cellAvailable = document.getElementById("r1c4") ? false : true;
				break;
			case 5:
				var cellAvailable = document.getElementById("r2c1") ? false : true;
				break;
			case 6:
				var cellAvailable = document.getElementById("r2c2") ? false : true;
				break;
			case 7:
				var cellAvailable = document.getElementById("r2c3") ? false : true;
				break;
			case 8:
				var cellAvailable = document.getElementById("r2c4") ? false : true;
				break;
			case 9:
				var cellAvailable = document.getElementById("r3c1") ? false : true;
				break;
			case 10:
				var cellAvailable = document.getElementById("r3c2") ? false : true;
				break;
			case 11:
				var cellAvailable = document.getElementById("r3c3") ? false : true;
				break;
			case 12:
				var cellAvailable = document.getElementById("r3c4") ? false : true;
				break;
			case 13:
				var cellAvailable = document.getElementById("r4c1") ? false : true;
				break;
			case 14:
				var cellAvailable = document.getElementById("r4c2") ? false : true;
				break;
			case 15:
				var cellAvailable = document.getElementById("r4c3") ? false : true;
				break;
			case 16:
				var cellAvailable = document.getElementById("r4c4") ? false : true;
				break;
		}
		return cellAvailable;
	}

});
