APIs

POST - /upload

// Uploads a single photo information to the DB.
// Params - { image_url: str, user_id: int, group_id: int }

GET - /list/:group_id

// List the photos by group ID.
// Params - Query parameter: group_id (int)
// Return - JSON object [{},{},{}]

GET - /list

// List  the entire  photos  table in  a JSON  feed  (should include primary key and all columns).
// Params - null
// Return - 200

GET - /view/:photo_id

// Accept  a parameter that  looks up  the database  entry by  primary key (i.e. /view/12  returns row 12).  
// Should  return  the image from  specified in  image_url and increment the object's  'views'  column  by  1.

// Params - Query parameter: photo_id (int)
// Return - JSON object {}