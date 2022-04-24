function openRequest(){
    $('#movie-list').html('');
    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey':  'ea4a609',
            's': $('#input-search').val()
        },
        success: function(result){
            if (result.Response == "True"){
            console.log(result);
            let movies = result.Search;
            console.log(movies);
            $.each(movies, function(i, data){
            $('#movie-list').append(`
                <div class="card mx-2 my-4 bg-dark text-light" style="width: 18rem;">
                    <img class="card-img-top mt-2" src="`+ data.Poster +`" alt="`+ data.Title + ` Movie's cover image">
                    <h2 class="card-title display-6">`+ data.Title +`</h2>
                    <small class="text-muted">Published in `+ data.Year +`</small>
                    <div class="card-body">
                        <a href="#" id= "see-detail" class="btn btn-light text-dark" data-bs-toggle="modal" data-bs-target="#getModal" data-id="`+ data.imdbID +`">See detail</a>
                    </div>
                </div>
                `)
            });
            }else{
                $('#movie-list').html(`
                 <h2 class= "text-center">`+result.Error+`</h2>
                `)
            }
            }
        })
}
$("#button-search").on('click', function(){
    openRequest();
});

$("#input-search").on('keyup', function(e){
    if (e.keyCode == 13){
        openRequest();
    }
});

$("#movie-list").on('click','#see-detail','.modal-fade', function(){
    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey':  'ea4a609',
            'i': $(this).data('id')
        },
        success: function(result){
            console.log(result);
            $('.modal-title').html(result.Title);
            $('.modal-body').html(`
            <div class="container-fluid">
                <div class="row mt-4">
                    <div class="col-md-4">
                        <img src="`+ result.Poster +`" class="img-fluid">
                        <small class='text-muted'>`+ result.Writer + `</small>
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                          <li class="list-group-item">Actors: `+ result.Actors +`</li>
                          <li class="list-group-item">imdbRating: `+ result.imdbRating +`</li>
                          <li class="list-group-item">Country from: `+ result.Country +`</li>
                          <li class="list-group-item">Plot story: `+ result.Plot +`</li>
                          <li class="list-group-item">Genre: `+ result.Genre +`</li>
                        </ul>
                    </div>
                </div>
            </div>
            `)

        }
    })
});