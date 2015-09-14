## APIs

Uploads a single photo information to the DB.
> POST - /upload

Params - { image_url: str, user_id: int, group_id: int }

List the photos by group ID.
> GET - /list/:group_id

Params - Query parameter: group_id (int)
Return - JSON object [{},{},{}]


List  the entire  photos  table in  a JSON  feed  (should include primary key and all columns).
> GET - /list

Params - null
Return - 200

Accept  a parameter that  looks up  the database  entry by  primary key (i.e. /view/12  returns row 12).  
Should  return  the image from  specified in  image_url and increment the object's  'views'  column  by  1.
> GET - /view/:photo_id

Params - Query parameter: photo_id (int)
Return - JSON object {}
