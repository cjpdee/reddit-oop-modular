export default function Post(post_id,date_posted,title,user,subreddit,content,upvotes,downvotes,comments) {
    this.post_id = post_id;
    this.date_posted = date_posted;
    this.title = title;
    this.user = user;
    this.subreddit = subreddit;
    this.content = content;
    this.comments = comments;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
}