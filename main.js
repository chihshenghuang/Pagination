$(document).ready(function(){
	var show_per_page = 1;
	//var number_of_items = $('#paginate tr').length; //Return the number of elements in the jQuery object.
	var number_of_items = 1;
	var navigation_html = '<a class="first_link" href=""><<</a>';
	var total_page = 1;
	var items = '<table id="paginate" id="table1" border="'+1+'">';


	$('#itemsNumInput').click(function(e){
		number_of_items = $('#itemsNum').val();

		items = '<table id="paginate" id="table1" border="'+1+'">';
		
		for (var i = 1; i <= number_of_items; i++){
			items += '<tr>' + '<td>' + i + '</td>' + '<td>' + 'Item' + i +'</td>' + '</tr>'; 
		}
		items += '</table>';
		$('#paginate').html(items);

		navigation_html = '<a class="first_link" href=""><<</a>';
		navigation_html += '<a class="previous_link" href="">Prev</a>';	
		total_page = 1;
		for (var i = 0; i < number_of_items; i = i + show_per_page) {
			navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (total_page) + '</a>';
			total_page++;
		}
		
		navigation_html += '<a class="next_link" href="">Next</a>';
		navigation_html += '<a class="last_link" href="">>></a>';
		$('#page_navigation').html(navigation_html); //.html() change all the content of elements
		rowDisplay(0, show_per_page);
		$('.page_link').first().addClass('active');
	});
	
	for (var i = 1; i <= number_of_items; i++){
		items += '<tr>' + '<td>' + i + '</td>' + '<td>' + 'Item' + i +'</td>' + '</tr>'; 
	}
	items += '</table>';
	$('#paginate').html(items);
	navigation_html += '<a class="previous_link" href="">Prev</a>';

// Create all the element and asign href link.
	for (var i = 0; i < number_of_items; i = i + show_per_page) {
		navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (total_page) + '</a>';
		total_page++;
	}

// After all the navigation_html are created, add the Next link 
// and $('#page_navigation').html(navigation_html) will create the navigation bar in the html
// which is located in <div id=page_navigation></div>
	navigation_html += '<a class="next_link" href="">Next</a>';
	navigation_html += '<a class="last_link" href="">>></a>';
	$('#page_navigation').html(navigation_html); //.html() change all the content of elements
	rowDisplay(0, show_per_page);
	console.log(navigation_html);

//hide() all the element and select the element you want to show
//slice() method selects a subset of elements based on its index	
	function rowDisplay(startIndex, endIndex) {
		$('#paginate tr').hide().slice(startIndex, endIndex).show();
	}

	function pagination(c, m){
		var current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;

		for (let i = 1; i <= last; i++){
			if(i == 1 || i == last || i >= left && i < right){
				range.push(i);
			}
		}

		for (let i of range){
			if (l){
				if (i - l == 2){
					rangeWithDots.push(l + 1);
				}else if (i - l !== 1){
					rangeWithDots.push('...');
				}
			}
		}

		rangeWithDots.push(i);
		l = i;

		return rangeWithDots;
	}




// Must bind with document to avoid the new '.page_link' can't have click event
	$(document).on('click', '.page_link', function(e){
		e.preventDefault(); //Cancel the default action when the method is called
		$('.active').removeClass('active');
		$(this).addClass('active');
		var IndexData = $(this).data();
		console.log(IndexData);
		rowDisplay(IndexData.start, IndexData.end);	
	});
	
	$('.page_link').first().addClass('active');  //.first() constructs a new jquery object from the first element in that set, and add the element to active class. This is for page show class with active at first time.

	$(document).on('click', '.previous_link, .next_link', function(e){
		e.preventDefault();
		var traverse = $(this).is('.previous_link') ? 'prev' : 'next';
		//Call the ('.page_link').click(function(e)) atfer decide the traverse value
		$('.page_link.active')[traverse]('.page_link').click(); 
	});

// First, Last Function
	$(document).on('click', '.first_link, .last_link', function(e){
		e.preventDefault();
		
		if($(this).is('.first_link')){
			console.log('show_per_page in the first_link', show_per_page);
			rowDisplay(0, show_per_page);
			$('.page_link').removeClass('active').first().addClass('active');
		}
		else{
			// Tow conditions to avoid the wrong boundary condtion in last_link 
			if(number_of_items % show_per_page){
				rowDisplay(number_of_items - (number_of_items % show_per_page), number_of_items);
			}
			else{
				rowDisplay(number_of_items - show_per_page, number_of_items);
			}
			$('.page_link').removeClass('active').last().addClass('active');
		}
		
	});

// Search Function
	$('#searchSubmit').click(function(e){
		var page = $('#searchInput').val();
		var data = page * show_per_page;

		if((page < total_page) && (page > 0)){
			rowDisplay((page * show_per_page) - show_per_page, page * show_per_page);
			$('.page_link').removeClass('active');
			$('a[data-end="' + data + '"]').addClass('active');
		}
		
		else{
			alert("Please input the correct page");
		}
		
	});

	$('#page_per_show').change(function(e){
		e.preventDefault();
		// The value get from the jQuery is not int, so use the parseInt to convert
		show_per_page = parseInt($('#page_per_show option:selected').val());
		navigation_html = '<a class="first_link" href=""><<</a>';
		navigation_html += '<a class="previous_link" href="">Prev</a>';	
		total_page = 1;
		for (var i = 0; i < number_of_items; i = i + show_per_page) {
			navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (total_page) + '</a>';
			total_page++;
		}
		navigation_html += '<a class="next_link" href="">Next</a>';
		navigation_html += '<a class="last_link" href="">>></a>';
		$('#page_navigation').html(navigation_html); //.html() change all the content of elements
		rowDisplay(0, show_per_page);
		$('.page_link').first().addClass('active');
	});

});


