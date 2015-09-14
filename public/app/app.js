$(function(){

  getPhotos();

  var socket = io.connect(window.location.hostname);
  // var socket = io.connect('http://localhost:8000'); 
  socket.emit('join'); 
  socket.on('update',function(){
    // Fetch data from server at /list
    getPhotos();
  });

  $('#photoForm').on('submit',function(e){
    e.preventDefault();
    var userId = $('#userId');
    var groupId = $('#groupId');
    var image_url = $('#imageUrl');

    uploadPhoto(userId.val(),groupId.val(),image_url.val());

    userId.val('');
    groupId.val('');
    image_url.val('');
  });

  function getPhotos(){
    $.ajax({
      type: "GET",
      url: '/list',
      success: function(res){
        $('.image-content').find('td').remove();

        for (var i = 0; i < res.length; i++) {
          var item = res[i];
          var row = $('<tr><td>'+ item.user_id +'</td><td>'+ item.group_id + '</td><td><img class="img-responsive" src="' + item.image_url + '"</img></tr>');
          $('.image-content').append(row);
        };
      },
      error: function(res){
        console.log('did not work');
      }
    });
  };

  function uploadPhoto(userId,groupId,image_url){
    console.log('submitting...',userId,groupId,image_url);
    var data = {
      user_id: userId,
      group_id: groupId,
      image_url: image_url
    };

    console.log(JSON.stringify(data));

    $.post('/upload',data)
      .done(function(data){
        console.log(data);
      })

    socket.emit('upload');
  }
});