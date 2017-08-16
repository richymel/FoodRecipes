//Add new photo
export function addPost(postId, caption, display_src) {  
  return {
    type: 'ADD_NEW',
    postId,
    caption,
    display_src
  }
}

//increment likes
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}

//add comment
export function addComment(postId, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    comment
  }
}

//remove comment
export function removeComment(postId, i){
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}

export function removeAllComments(code) {
  return {
    type: 'REMOVE_ALL_COMMENTS',
    code
  }
}

//remove entire POST (& comments for the post too!)
export function removePost(idx) {  
  return {
    type: 'REMOVE_POST',
    i: idx
  }  
}