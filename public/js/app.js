// create our angular app
const app = angular.module('BlogsApp', [])
// create our app controller
app.controller('MainController', [ '$http', function($http) {
  this.h5 = 'Blogs! Celebrate!'
 // because of 2 way binding...anytime the holidays array is updated (add/remove)..
 // this will trigger Angular to update the DOM
  this.blogs = []
  this.blog = ''
  this.createForm = {};
  this.editBlog = {};

  // createHoliday method
  this.createBlog = () => {
    this.createForm.tags = this.createForm.tags.split(' ')
    console.log(this.createForm.tags);
    $http({
      method:'POST',
      url:'/blogs',
      data: this.createForm
    }).then(response => {
      // holiday was created successfully...what to no now?
      // option 1: call the getHolidays method
      // this.getHolidays()
      // option 2: push object into holidays array
      this.blogs.unshift(response.data)
      this.createForm = {}
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  } // closes createHoliday

  // getHolidays method
  this.getBlogs = () => {
    $http({
      method: 'GET',
      url: '/blogs'
    }).then( response => {
      this.blogs = response.data
      this.blog = this.blogs[0]
      console.log(this.blogs)
    }).catch( err => { console.log(err)})
  } // close getHolidays

  // deleteHoliday method
  this.deleteBlog = id => {
    $http({
      method:'Delete',
      url: '/blogs/' + id
      // the delete has been successful
    }).then(response => {
      console.log(response.data)
      // target the object in the holidays array and delete it
      // findIndex is a loop just like .forEach, .map, .filter, .reduce
      const removeByIndex = this.blogs.findIndex(blog => blog._id === id)
      // remove it from the array
      this.blogs.splice(removeByIndex, 1)
    }).catch(err => console.log(err))
  } // close deleteHoliday

  // updateCelebrated method
  this.updateBlog = blog => {
    $http({
      method:'PUT',
      url: '/blogs/' + blog._id,
      data: blog
    }).then(response => {
      console.log(response.data.blog)

    }).catch(err => console.log(err))
  } // close updateCelebrated

  // chooseOneHoliday method
  this.chooseOneBlog = blog => {
    this.blog = blog
    console.log(this.blog.name)
  }

  this.increaseLikes = blog => {
    blog.likes +=1;
    this.updateBlog(blog)

  }

  // call the getHolidays method on page load
  this.getBlogs()

  //Edit and Modal
  this.editBlogModal = (blog) => { 
    this.editBlog.modal = !this.editBlog.modal;
    this.editBlog.blog = blog;
    console.log(blog.tags);
    let tempTags = blog.tags.slice(0);
    this.editBlog.blog.tags = tempTags.join(' ');
  }
  this.saveEditBlog = (blog) => { 
    blog.tags = blog.tags.split(' ')
    console.log(blog.tags);
    this.updateBlog(blog);
    this.editBlog = {};
  }
  this.cancelEditBlog = (blog) => { 
    this.editBlog = {};
    console.log(blog);
    this.getBlogs(blog);
  }


}]) // closes app.controller
