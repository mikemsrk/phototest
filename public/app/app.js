$(function(){

  getPhotos();
  // var socket = io.connect(window.location.hostname);
  var socket = io.connect('http://localhost:8000'); 
  socket.emit('join'); 
  socket.on('update',function(){
    // Fetch data from server at /list
    getPhotos();
  });

  $('#photoForm').on('submit',function(e){
    e.preventDefault();
    var userId = parseInt($('#userId').val());
    var groupId = parseInt($('#groupId').val());
    var image_url = $('#imageUrl').val();

    if(validate(userId,'number') && validate(groupId,'number') && validate(image_url,'string')){
      uploadPhoto(userId,groupId,image_url);
    }else{
      alert('Incorrect/blank values');
    }

    $('#userId').val('');
    $('#groupId').val('');
    $('#imageUrl').val('');
  });

  function validate(value,type){
    if(type === 'string'){
      if(typeof value === 'string' && value.length > 0){
        return true;
      }else{
        return false;
      }
    }else if(type === 'number'){
      if(value && typeof value === 'number'){
        return true;
      }else{
        return false;
      }
    }
  }

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

    $.post('/upload',data)
      .done(function(data){
        console.log(data);
      })

    socket.emit('upload');
  }
});