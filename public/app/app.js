$(function(){

  getPhotos();
  var socket;

  if(window.location.hostname === 'localhost'){
    socket = io.connect('http://localhost:8000'); 
  }else{
    socket = io.connect(window.location.hostname);
  }

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

    if(validate(userId,'number',$('#userId')) && validate(groupId,'number',$('#groupId')) && validate(image_url,'string',$('#imageUrl'))){
      uploadPhoto(userId,groupId,image_url);
    }

    $('#userId').val('');
    $('#groupId').val('');
    $('#imageUrl').val('');
  });

  function validate(value,type,obj){
    if(type === 'string'){
      if(typeof value === 'string' && value.length > 0){
        obj.closest('div').removeClass('has-error');
        return true;
      }else{
        obj.closest('div').addClass('has-error');
        return false;
      }
    }else if(type === 'number'){
      if(value && typeof value === 'number'){
        obj.closest('div').removeClass('has-error');
        return true;
      }else{
        obj.closest('div').addClass('has-error');
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