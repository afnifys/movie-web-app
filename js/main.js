$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText=$('#searchText').val();
        getMovies(searchText); 
        e.preventDefault();
    });
});

function getMovies(searchText){
	axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=572bbefa')
		.then((response)=>{
			console.log(response);
			let movies = response.data.Search;
			let output = '';
			$.each(movies,(index,movie)=>{
				 output+= 
				 `
				 	<div class="col-md-3">
				 		<div class="well text-center">
				 		<img src="${movie.Poster}">
				 		<h6> ${movie.Title} </h6>
				 		<a onClick="movieSelected('${movie.imdbID}')"class="btn btn-primary" href="#">Movie Details</a>
				 	</div>
				 	</div>
				 `;
			});

			$('#movies').html(output);
		})
	.catch((err)=>{
		console.log(err);
    });
}
        
function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}
    
function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    
    axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=572bbefa')
    .then((response)=>{
        console.log(response);
        let movie =response.data;
    
        let output = `
    
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2> ${movie.Title}</h2>
                    <br>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Genre       :</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released    :</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated       :</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating :</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director    :</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer      :</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actros      :</strong> ${movie.Actors}</li>    
                </div>	
            <div>

            <div class="row">
                <div class="well">
                    <h3><br>Plot</h3>
                        ${movie.Plot}
                    <hr>
                    
                    <a href="index.html" class="btn btn-dark">Go Back To Search</a>
    
            `;
    
            $('#movie').html(output);
                
        })
        .catch((err)=>{
            console.log(err);
        });

}