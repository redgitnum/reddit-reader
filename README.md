## REDDIT READER

### intro

Had an idea to use the reddit API to make a little reader without any special functions or bloat when viewing. The data from the api was not very easy to handle as there are dozens of types of posts, flairs, x-posts(repost with a nested post), managing different filetypes (some are processed by reddit itself) so the app does not work exactly the way I wanted but I know it is a rabbit hole so I will move on for now and maybe return in the future. More info below.

### overview

Just a practice with outside API.

* START
  * At the start the app load the default 'main page' of reddit,
  * gets 50 posts at the start,
  * gets another 50 every time you scroll to a certain point (infinity scroll)
  * you can change the sorting type at the top, result are just like on reddit
  
* POST DETAIL
  * After clicking on a post you can view more details and read comments,
  * for now not all post types are handled the right way (example 'streamable' links without sound),
  * every post has a link to original post on reddit.com
