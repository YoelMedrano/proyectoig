$.ajax({
	url :'https://ignsw201825-snproject.herokuapp.com/search/instagram?q=messi',         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
dataType : 'json',
	success: function(data){
		console.log(data);
		for(x in data.data){
			$('#galeria-instagram').append('<li><img src="'+data.data[x].images.thumbnail.url+'"></li>');  
		}
	},
	error: function(data){
		console.log(data);
	}
});
