/**
 * @author Yehezkel
 */
$(document).ready(function() {
	var takenSpots = initialization(); // keeping track of where there are squares
	var fired = false; // flag for setting keyDown enent only 1 time per press/hold
	var i,j,n = 0; //parameters for loops
	var $animatedDiv = $('div#r' + i + 'c' + j);
	var gameOver = false;
	var allSquaresFull = false;
	var anySquareMoved = false;
	
	spawnSquare();
    $(document).keydown(function(key) {
    	
    	if (!fired){
    		fired = true;
	        switch(parseInt(key.which,10)) {
				case 37:// Left arrow key pressed
				slideLeft();
				(anySquareMoved || allSquaresFull) ? spawnSquare() : null;
					break;
				case 38:// Up Arrow Pressed
				slideUp();
				(anySquareMoved || allSquaresFull) ? spawnSquare() : null;
					break;
				case 39:// Right Arrow Pressed
				slideRight();
				(anySquareMoved || allSquaresFull) ? spawnSquare() : null;
					break;
				case 40:// Down Arrow Pressed
				slideDown();
				(anySquareMoved || allSquaresFull) ? spawnSquare() : null;
					break;
			}
		}
	});
	$(document).keyup(function(){
		
		fired = false;
	});
	
	function slideDown(){
		var anyReasonToContinue = true;
		anySquareMoved = false;
		for(i = 0; i < 4; i++){for(j = 0; j<4; j++){takenSpots[i][j].wasMerged = 0;}}

		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( j = 3 ; j >= 0 ; j-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( i = 2 ; i >= 0 ; i-- ){ //Moving over columns
					if (takenSpots[i][j].taken === 1){ //checking if ther is a square on r(i)c(j)
						$animatedDiv = $('div#r' + i + 'c' + j);
						if (takenSpots[i+1][j].taken === 0){//checking if ther is a square 1 cell below 
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							takenSpots[i+1][j].taken = 1;
							
							anySquareMoved = true;
							
							$animatedDiv.animate({top: '+=11em'},80);
								
							$animatedDiv.attr('id',('r' + (i+1).toString() + 'c'+ j));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
						else if ((takenSpots[i+1][j].wasMerged === 0) && (takenSpots[i+1][j].taken === 1) && (($animatedDiv.find('p').html()) === ($('div#r' + (i+1).toString() + 'c' + j).find('p').html()))){
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							for(n = i; n <= 2 ; n++){takenSpots[n+1][j].wasMerged = 1;}
							anySquareMoved = true;
							
							$animatedDiv.animate({top: '+=11em'},80);
							animateDiv($animatedDiv);
							
							$animatedDiv.find('p').html((parseInt($animatedDiv.find('p').html())*2).toString());//(parseInt($animatedDiv.attr('class'))).toString());
							$animatedDiv.attr('class','square_' + $animatedDiv.find('p').html());//((parseInt($animatedDiv.attr('class')))*2).toString() + ' square');// actual transition
							$('div#r' + (i+1).toString() + 'c' + j).remove();
							$animatedDiv.attr('id','r' + (i+1).toString() + 'c'+ j);// actual transition
								
							
														
							//anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}

	function slideUp(){
		var anyReasonToContinue = true;
		anySquareMoved = false;
		for(i = 0; i < 4; i++){for(j = 0; j<4; j++){takenSpots[i][j].wasMerged = 0;}}
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( j = 3 ; j >= 0 ; j-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( i = 1 ; i <= 3 ; i++ ){ //Moving over columns
					if (takenSpots[i][j].taken === 1){ //checking if ther is a square on r(i)c(j)
						$animatedDiv = $('div#r' + i + 'c' + j);
						if (takenSpots[i-1][j].taken === 0){//checking if ther is a square 1 cell below 
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							takenSpots[i-1][j].taken = 1;
							
							anySquareMoved = true;
							
							$animatedDiv.animate({top: '-=11em'},80);
							
							$animatedDiv.attr('id',('r' + (i-1).toString() + 'c'+ j));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
						else if ((takenSpots[i-1][j].wasMerged === 0) && (takenSpots[i-1][j].taken === 1) && (($animatedDiv.find('p').html()) === ($('div#r' + (i-1).toString() + 'c' + j).find('p').html()))){
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							for(n = i; n >= 1; n--){takenSpots[n-1][j].wasMerged = 1;}
							anySquareMoved = true;
							
							$animatedDiv.animate({top: '-=11em'},80);
							
							animateDiv($animatedDiv);
							
							$animatedDiv.find('p').html((parseInt($animatedDiv.find('p').html())*2).toString());//(parseInt($animatedDiv.attr('class'))).toString());
							$animatedDiv.attr('class','square_' + $animatedDiv.find('p').html());//((parseInt($animatedDiv.attr('class')))*2).toString() + ' square');// actual transition
							$('div#r' + (i-1).toString() + 'c' + j).remove();
							$animatedDiv.attr('id','r' + (i-1).toString() + 'c'+ j);// actual transition
								
							
														
							//anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}
	
	function slideRight(){
		var anyReasonToContinue = true;
		anySquareMoved = false;
		for(i = 0; i < 4; i++){for(j = 0; j<4; j++){takenSpots[i][j].wasMerged = 0;}}
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;
			for ( i = 3 ; i >= 0 ; i-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( j = 2 ; j >= 0 ; j-- ){ //Moving over columns
					if (takenSpots[i][j].taken === 1){ //checking if ther is a square on r(i)c(j)
						$animatedDiv = $('div#r' + i + 'c' + j);
						if (takenSpots[i][j+1].taken === 0){//checking if ther is a square 1 cell below 
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							takenSpots[i][j+1].taken = 1;
							
							anySquareMoved = true;
							
							$animatedDiv.animate({left: '+=11em'},80);
							
							$animatedDiv.attr('id',('r' + i + 'c'+ (j+1).toString()));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
						else if ((takenSpots[i][j+1].wasMerged === 0) && (takenSpots[i][j+1].taken === 1) && (($animatedDiv.find('p').html()) === ($('div#r' + i + 'c' + (j+1).toString()).find('p').html()))){
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							for(n = j; n <= 2; n++){takenSpots[i][n+1].wasMerged = 1;}
							anySquareMoved = true;
							
							$animatedDiv.animate({left: '+=11em'},80);
							
							animateDiv($animatedDiv);
							
							$animatedDiv.find('p').html((parseInt($animatedDiv.find('p').html())*2).toString());//(parseInt($animatedDiv.attr('class'))).toString());
							$animatedDiv.attr('class','square_' + $animatedDiv.find('p').html());//((parseInt($animatedDiv.attr('class')))*2).toString() + ' square');// actual transition
							$('div#r' + i + 'c' + (j+1).toString()).remove();
							$animatedDiv.attr('id','r' + i + 'c'+ (j+1).toString());// actual transition
						}
					}
				}
			}
		}
	}
	
	function slideLeft(){
		var anyReasonToContinue = true;
		anySquareMoved = false;
		for(i = 0; i < 4; i++){for(j = 0; j<4; j++){takenSpots[i][j].wasMerged = 0;}}
		
		while(anyReasonToContinue){
			anyReasonToContinue = false;

			for ( i = 3 ; i >= 0 ; i-- ){ // Moving over rows. No need to slideDown last row. Think
				for ( j = 1 ; j <= 3 ; j++ ){ //Moving over columns
					if (takenSpots[i][j].taken === 1){ //checking if ther is a square on r(i)c(j)
						$animatedDiv = $('div#r' + i + 'c' + j);
						if (takenSpots[i][j-1].taken === 0){//checking if ther is a square 1 cell below 
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							takenSpots[i][j-1].taken = 1;
							
							anySquareMoved = true;
							
							$animatedDiv.animate({left: '-=11em'},80);
							
							$animatedDiv.attr('id',('r' + i + 'c'+ (j-1).toString()));// actual transition
							anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
						else if ((takenSpots[i][j-1].wasMerged === 0) && (takenSpots[i][j-1].taken === 1) && (($animatedDiv.find('p').html()) === ($('div#r' + i + 'c' + (j-1).toString()).find('p').html()))){
							takenSpots[i][j].taken = 0;//updating takenSpots before transition
							for(n = j; n >= 1; n--){takenSpots[i][n-1].wasMerged = 1;}
							anySquareMoved = true;
							
							$animatedDiv.animate({left: '-=11em'},80);
							
							animateDiv($animatedDiv);
							
							$animatedDiv.find('p').html((parseInt($animatedDiv.find('p').html())*2).toString());//(parseInt($animatedDiv.attr('class'))).toString());
							$animatedDiv.attr('class','square_' + $animatedDiv.find('p').html());//((parseInt($animatedDiv.attr('class')))*2).toString() + ' square');// actual transition
							$('div#r' + i + 'c' + (j-1).toString()).remove();
							$animatedDiv.attr('id','r' + i + 'c'+ (j-1).toString());// actual transition
								
							
														
							//anyReasonToContinue = true;// try again, make sure it moves all the way down
						}
					}
				}
			}
		}
	}
	
	function spawnSquare(){
		var randomCell = 0;
		var spawned = false;
		
		allSquaresFull = true;
		for(i = 0; i < 4; i++){
			for(j = 0; j<4; j++){
				if (takenSpots[i][j].taken === 0){
					allSquaresFull =  false;
				}
			}
		}
		
		if (allSquaresFull === false){
			do {
				randomCell = Math.floor(Math.random()*16) + 1;
			} while (!checkAvailable( randomCell ));
			
			
			var row = Math.floor((randomCell - 1) / 4); // generated cell row 
			var column = ((randomCell - 1) % 4); // generated cell column
			
			// generating appropriate  <div> element
			$('div#main').append('<div class="square_' + takenSpots[row][column].className + '" id="r' + row + 'c' + column +'"><p>' + takenSpots[row][column].className + '</p></div>');
			var $generatedDiv = $('div#r' + row + 'c' + column);
						
			$generatedDiv.hide();//effects
			$generatedDiv.animate({
				left:  takenSpots[row][column].marginLeft,
				top: takenSpots[row][column].marginTop
			},90, function(){
				$(this).fadeIn(90);//effects
			});
			spawned = true;
		}
		
		allSquaresFull = true;
		for(i = 0; i < 4; i++){
			for(j = 0; j<4; j++){
				if (takenSpots[i][j].taken === 0){
					allSquaresFull =  false;
				}
			}
		}
			
		if ((allSquaresFull === true) && (spawned === false)){
			gameOver = true;
			for(i = 1; i < 3; i++){
				for(j = 1; j < 3; j++){
					$animatedDiv = $('div#r' + i + 'c' + j);
					if(
					(($animatedDiv.find('p').html() ===  $('div#r' + (i+1).toString() + 'c' + j).find('p').html()))  ||
					(($animatedDiv.find('p').html() ===  $('div#r' + (i-1).toString() + 'c' + j).find('p').html()))  ||
					(($animatedDiv.find('p').html() ===  $('div#r' + i + 'c' + (j+1).toString()).find('p').html()))  ||
					(($animatedDiv.find('p').html() ===  $('div#r' + i + 'c' + (j-1).toString()).find('p').html()))
					){
						gameOver =  false;
					}
				}
			}
			if (
				($('div#r0c0').find('p').html() === $('div#r0c1').find('p').html()) ||
				($('div#r0c0').find('p').html() === $('div#r1c0').find('p').html()) ||
				
				($('div#r0c3').find('p').html() === $('div#r0c2').find('p').html()) ||
				($('div#r0c3').find('p').html() === $('div#r1c3').find('p').html()) ||
				
				($('div#r3c3').find('p').html() === $('div#r2c3').find('p').html()) ||
				($('div#r3c3').find('p').html() === $('div#r3c2').find('p').html()) ||
				
				($('div#r3c0').find('p').html() === $('div#r2c0').find('p').html()) ||
				($('div#r3c0').find('p').html() === $('div#r3c1').find('p').html()) ){
				
				gameOver =  false;
			}
			if (gameOver === true) alert('Game Over!!!');
		}
		
	}
	
	function checkAvailable( cell ){
		var cellAvailable = false;
		var twoOrFour = ((Math.floor(Math.random()*14) + 1) === 1) ? 4 : 2; 
		switch(cell){
			case 1:
				if (takenSpots[0][0].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[0][0] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '1em',
						marginTop: '1em'};}
				break;
			case 2:
				if (takenSpots[0][1].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[0][1] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '12em',
						marginTop: '1em'};}
				break;
			case 3:
				if (takenSpots[0][2].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[0][2] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '23em',
						marginTop: '1em'};}
				break;
			case 4:
				if (takenSpots[0][3].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[0][3] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '34em',
						marginTop: '1em'};}
				break;
			case 5:
				if (takenSpots[1][0].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[1][0] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '1em',
						marginTop: '12em'};}
				break;
			case 6:
				if (takenSpots[1][1].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[1][1] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '12em',
						marginTop: '12em'};}
				break;
			case 7:
				if (takenSpots[1][2].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[1][2] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '23em',
						marginTop: '12em'};}
				break;
			case 8:
				if (takenSpots[1][3].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[1][3] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '34em',
						marginTop: '12em'};}
				break;
			case 9:
				if (takenSpots[2][0].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[2][0] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '1em',
						marginTop: '23em'};}
				break;
			case 10:
				if (takenSpots[2][1].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[2][1] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '12em',
						marginTop: '23em'};}
				break;
			case 11:
				if (takenSpots[2][2].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[2][2] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '23em',
						marginTop: '23em'};}
				break;
			case 12:
				if (takenSpots[2][3].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[2][3] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '34em',
						marginTop: '23em'};}
				break;
			case 13:
				if (takenSpots[3][0].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[3][0] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '1em',
						marginTop: '34em'};}
				break;
			case 14:
				if (takenSpots[3][1].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[3][1] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '12em',
						marginTop: '34em'};}
				break;
			case 15:
				if (takenSpots[3][2].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[3][2] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '23em',
						marginTop: '34em'};}
				break;
			case 16:
				if (takenSpots[3][3].taken !== 0){
					cellAvailable = false;}
				else{
					cellAvailable = true;
					takenSpots[3][3] = {
						taken: 1,
						wasMerged: 0,
						className: twoOrFour,
						marginLeft: '34em',
						marginTop: '34em'};}
				break;
		}
		return cellAvailable;
	}

	function initialization(){
		
		var newArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		for (var i = 0; i < 4; i++){
			for (var j = 0; j <4; j++){
				
				newArray[i][j] = {
					taken: 0,
					className: null,
					marginLeft: null,
					marginTop: null
				};
			}
		}
		
		return newArray;
	}
	
	function animateDiv($animatedDiv){
		switch(parseInt($animatedDiv.find('p').html())){
			case 2:
			$animatedDiv.animate({
				height: '+=0.1em',
				width: '+=0.1em'
				},85);
			$animatedDiv.animate({
				height: '-=0.1em',
				width: '-=0.1em'
				},85);
			break;
		case 4:
			$animatedDiv.animate({
				height: '+=0.2em',
				width: '+=0.2em'
				},85);
			$animatedDiv.animate({
				height: '-=0.2em',
				width: '-=0.2em'
				},85);
			break;
		case 8:
			$animatedDiv.animate({
				height: '+=0.3em',
				width: '+=0.3em'
				},85);
			$animatedDiv.animate({
				height: '-=0.3em',
				width: '-=0.3em'
				},85);
			break;
		case 16:
			$animatedDiv.animate({
				height: '+=0.4em',
				width: '+=0.4em'
				},85);
			$animatedDiv.animate({
				height: '-=0.4em',
				width: '-=0.4em'
				},85);
			break;
		case 32:
			$animatedDiv.animate({
				height: '+=0.5em',
				width: '+=0.5em'
				},85);
			$animatedDiv.animate({
				height: '-=0.5em',
				width: '-=0.5em'
				},85);
			break;
		case 64:
			$animatedDiv.animate({
				height: '+=0.6em',
				width: '+=0.6em'
				},85);
			$animatedDiv.animate({
				height: '-=0.6em',
				width: '-=0.6em'
				},85);
			break;
		case 128:
			$animatedDiv.animate({
				height: '+=0.7em',
				width: '+=0.7em'
				},85);
			$animatedDiv.animate({
				height: '-=0.7em',
				width: '-=0.7em'
				},85);
			break;
		case 256:
			$animatedDiv.animate({
				height: '+=0.8em',
				width: '+=0.8em',
				},85);
			$animatedDiv.animate({
				height: '-=0.8em',
				width: '-=0.8em'
				},85);
			break;
		case 512:
			$animatedDiv.animate({
				height: '+=0.9em',
				width: '+=0.9em'
				},85);
			$animatedDiv.animate({
				height: '-=0.9em',
				width: '-=0.9em'
				},85);
			break;
		case 1024:
			$animatedDiv.animate({
				height: '+=1em',
				width: '+=1em'
				},85);
			$animatedDiv.animate({
				height: '-=1em',
				width: '-=1em'
				},85);
			break;
		case 2048:
			$animatedDiv.animate({
				height: '+=1.2em',
				width: '+=1.2em'
				},85);
			$animatedDiv.animate({
				height: '-=1.2em',
				width: '-=1.2em'
				},85);
			break;
		case 4096:
			$animatedDiv.animate({
				height: '+=2em',
				width: '+=2em'
				},85);
			$animatedDiv.animate({
				height: '-=2em',
				width: '-=2em'
				},85);
			break;
		default:
			$animatedDiv.animate({
				height: '+=3em',
				width: '+=3em'
				},85);
			$animatedDiv.animate({
				height: '-=3em',
				width: '-=3em'
				},85);
			break;
		}
	}
});
